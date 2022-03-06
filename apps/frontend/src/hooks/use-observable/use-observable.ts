import { useLocalObservable } from 'mobx-react-lite';
import { IRootStore } from '@types';
import { RootStoreSingle } from '@stores';

export const useObservable = () => {
  return useLocalObservable(() => RootStoreSingle.instance());
};

export const useObservableSelector = <T>(selector: (store: IRootStore) => T): T => {
  return selector(useObservable());
};

export const useObservableRoot = () => {
  return useObservableSelector((store) => store);
};

export const useObservableWallet = () => {
  return useObservableSelector((store) => store.walletStore);
};

export const useObservableToast = () => {
  return useObservableSelector((store) => store.toastStore);
};
