import { enableStaticRendering } from 'mobx-react-lite';
import { isServer } from '@utils';
import { ToastStore, WalletStore } from '@stores';
import { IRootStore, IToastStore, IWalletStore } from '@types';

enableStaticRendering(isServer);

class RootStore implements IRootStore {
  public toastStore: IToastStore;
  public walletStore: IWalletStore;

  constructor() {
    this.toastStore = new ToastStore();
    this.walletStore = new WalletStore(this);
  }
}

export class RootStoreSingle {
  private static rootStore: IRootStore;

  public static instance(): IRootStore {
    if (this.rootStore === undefined) {
      this.rootStore = new RootStore();
    }
    return this.rootStore;
  }
}
