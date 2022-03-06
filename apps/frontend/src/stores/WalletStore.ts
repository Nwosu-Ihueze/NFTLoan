import { makeAutoObservable } from 'mobx';
import { BigNumber, ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { isServer } from '@utils';
import { AddEthereumChainParameter, IRootStore, IWalletStore, Toast } from '@types';
import { ETHEREUM_METHOD, METAMASK_EVENT, METAMASK_METHOD, TOAST_DURATION, TOAST_TYPE } from '@enums';

export class WalletStore implements IWalletStore {
  public account?: string = undefined;
  public chainId?: number = undefined;
  public balance?: BigNumber = undefined;
  public provider?: Web3Provider = undefined;

  private readonly root: IRootStore;

  constructor(root: IRootStore) {
    this.root = root;
    if (isServer) return;
    this.initialWalletStore();
    makeAutoObservable(this);
  }

  public get isMetaMaskInstalled(): boolean {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }

  private get autoConnectShim(): boolean {
    const shim = localStorage.getItem('autoConnectShim');
    return shim ? Boolean(shim) : false;
  }

  public activate = async (callback?: (done: boolean) => void): Promise<void> => {
    if (this.isMetaMaskInstalled) {
      if (!this.account) {
        try {
          const accounts = await this.provider?.send(ETHEREUM_METHOD.REQUEST_ACCOUNTS, []);
          const checksumAddress = ethers.utils.getAddress(accounts[0]);
          const balance = await this.getAccountBalance(accounts);
          const network = await this.provider?.getNetwork();
          this.setAccount(checksumAddress);
          this.setBalance(balance);
          this.setChainID(network?.chainId);
          this.setAutoConnectShim(true);
          callback && callback(true);
          this.toast({
            type: TOAST_TYPE.SUCCESS,
            message: `Wallet Connect with ${checksumAddress.substring(0, 5)}.`
          });
        } catch (error: any) {
          callback && callback(false);
          this.toast({
            type: TOAST_TYPE.WARNING,
            message: error.message
          });
        }
      }
    } else {
      callback && callback(false);
      this.toast({
        type: TOAST_TYPE.WARNING,
        message: 'Please install MetaMask.'
      });
    }
  };

  public deactivate = async (): Promise<void> => {
    this.setAccount(undefined);
    this.setChainID(undefined);
    this.setBalance(undefined);
    this.setAutoConnectShim(false);
    this.toast({
      type: TOAST_TYPE.WARNING,
      message: 'Account longed out'
    });
  };

  public switchEthereumChain = async (params: { chainId: number }): Promise<void> => {
    if (this.isMetaMaskInstalled) {
      const hexadecimalChainId = ethers.utils.hexValue(params.chainId);
      try {
        await this.provider?.send(METAMASK_METHOD.SWITCH_ETHEREUM_CHAIN, [{ chainId: hexadecimalChainId }]);
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await this.addEthereumChain({
              chainId: '0x13881',
              chainName: 'Polygon Mumbai Testnet',
              rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
              nativeCurrency: {
                name: 'Mumbai Matic',
                symbol: 'MATIC',
                decimals: 18
              },
              blockExplorerUrls: ['https://mumbai.polygonscan.com/']
            });
          } catch (error) {
            this.toast({
              type: TOAST_TYPE.WARNING,
              message: 'Can not add ethereum chain. Chain id: 0x13881'
            });
          }
        }
        this.toast({
          type: TOAST_TYPE.WARNING,
          message: error.message
        });
      }
    } else {
      this.toast({
        type: TOAST_TYPE.WARNING,
        message: 'Please install MetaMask.'
      });
    }
  };

  public addEthereumChain = async (params: AddEthereumChainParameter): Promise<void> => {
    await this.provider?.send(METAMASK_METHOD.WALLET_ADD_ETHEREUM_CHAIN, [params]);
  };

  public getAccountBalance = async (accounts: Array<string>): Promise<BigNumber | undefined> => {
    return this.provider?.getBalance(accounts[0]);
  };

  public getListAccounts = async (): Promise<Array<string> | undefined> => {
    return this.provider?.listAccounts();
  };

  public getWalletConnectionStatus = async (): Promise<boolean> => {
    const listAccounts = await this.getListAccounts();
    return Boolean(listAccounts && listAccounts.length > 0);
  };

  private initialWalletStore = async (): Promise<void> => {
    if (this.isMetaMaskInstalled) {
      this.provider = new Web3Provider(window.ethereum);
      this.onConnect();
      this.onDisconnect();
      this.onChainChanged();
      this.onAccountsChanged();
      if (this.autoConnectShim) await this.autoConnectAccount();
    } else {
      this.toast({
        type: TOAST_TYPE.WARNING,
        message: 'Please install MetaMask.'
      });
    }
  };

  private autoConnectAccount = async (): Promise<void> => {
    const listAccounts = await this.getListAccounts();
    const isConnected = await this.getWalletConnectionStatus();
    if (isConnected && listAccounts) {
      const balance = await this.getAccountBalance(listAccounts);
      this.setAccount(listAccounts[0]);
      this.setBalance(balance);
      this.toast({
        type: TOAST_TYPE.SUCCESS,
        message: `Auto Connect with ${listAccounts[0].substring(0, 5)}.`
      });
    }
  };

  private onConnect = (): void => {
    window.ethereum.on(METAMASK_EVENT.CONNECT, async (connectInfo: { chainId: string }): Promise<void> => {
      this.setChainID(connectInfo.chainId);
      this.toast({
        type: TOAST_TYPE.SUCCESS,
        message: 'Connected.'
      });
    });
  };

  private onDisconnect = (): void => {
    window.ethereum.on(METAMASK_EVENT.DISCONNECT, async (error: { code: number; message: string }): Promise<void> => {
      this.toast({
        type: TOAST_TYPE.WARNING,
        message: error.message
      });
    });
  };

  private onChainChanged = (): void => {
    window.ethereum.on(METAMASK_EVENT.CHAIN_CHANGED, async (chainId: string): Promise<void> => {
      this.setChainID(chainId);
      this.toast({
        type: TOAST_TYPE.DEFAULT,
        message: `Chain changed: ${chainId}.`
      });
    });
  };

  private onAccountsChanged = (): void => {
    window.ethereum.on(METAMASK_EVENT.ACCOUNTS_CHANGED, async (accounts: Array<string>): Promise<void> => {
      if (accounts && accounts.length > 0) {
        const checksumAddress = ethers.utils.getAddress(accounts[0]);
        const shouldNotice = Boolean(this.account && checksumAddress !== this.account);
        this.setAccount(checksumAddress);
        const balance = await this.getAccountBalance(accounts);
        this.setBalance(balance);
        if (shouldNotice) {
          this.toast({
            type: TOAST_TYPE.SUCCESS,
            message: `Wallet account changed to ${checksumAddress.substring(0, 5)}.`
          });
        }
      } else if (accounts.length === 0) {
        this.setAccount(undefined);
        this.setChainID(undefined);
        this.setBalance(undefined);
        this.toast({
          type: TOAST_TYPE.WARNING,
          message: `Account disconnect.`
        });
      }
    });
  };

  private toast = (param: Toast): void => {
    const { show, close } = this.root.toastStore;
    show({
      data: param,
      callback: (uid: string) => {
        setTimeout(() => close(uid), TOAST_DURATION.NORMAL);
      }
    });
  };

  private setAccount = (account: string | undefined): void => {
    this.account = account;
  };

  private setBalance = (balance: BigNumber | undefined): void => {
    this.balance = balance;
  };

  private setChainID = (chainId: string | number | undefined): void => {
    if (typeof chainId === 'string') {
      this.chainId = parseInt(chainId, 16);
    } else {
      this.chainId = chainId;
    }
  };

  private setAutoConnectShim = (shim: boolean): void => {
    if (shim) localStorage.setItem('autoConnectShim', String(shim));
    if (!shim) localStorage.removeItem('autoConnectShim');
  };
}
