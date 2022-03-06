import { BigNumber } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { TOAST_DURATION, TOAST_TYPE } from '@enums';

export interface IRootStore {
  toastStore: IToastStore;
  walletStore: IWalletStore;
}

/**
 * Wallet
 */
export interface IWalletStore {
  account?: string;
  chainId?: number;
  balance?: BigNumber;
  provider?: Web3Provider;
  isMetaMaskInstalled: boolean;
  activate: (callback?: (done: boolean) => void) => Promise<void>;
  deactivate: () => Promise<void>;
  switchEthereumChain: (params: { chainId: number }) => Promise<void>;
  addEthereumChain: (params: AddEthereumChainParameter) => Promise<void>;
  getAccountBalance: (accounts: Array<string>) => Promise<BigNumber | undefined>;
  getListAccounts: () => Promise<Array<string> | undefined>;
  getWalletConnectionStatus: () => Promise<boolean>;
}

export type AddEthereumChainParameter = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
};

/**
 * Toast
 */
export interface IToastStore {
  toasts: ToastUID[];
  close: (uid: string) => void;
  show: (param: ToastCallback) => void;
}

export type Toast = {
  type: TOAST_TYPE;
  message: string;
};

export type ToastUID = Toast & {
  uid: string;
};

export type ToastCallback = {
  data: Toast;
  callback?: (uid: string) => void;
};

export type ToastDuration = {
  data: Toast;
  duration?: TOAST_DURATION;
};
