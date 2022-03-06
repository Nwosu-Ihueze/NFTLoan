import { v4 as uuid } from 'uuid';
import { makeAutoObservable } from 'mobx';
import { isServer } from '@utils';
import { IToastStore, ToastCallback, ToastUID } from '@types';

export class ToastStore implements IToastStore {
  public toasts: Array<ToastUID> = new Array<ToastUID>();

  constructor() {
    if (isServer) return;
    makeAutoObservable(this);
  }

  public show = (param: ToastCallback): void => {
    const { data, callback } = param;
    const uid = uuid();
    this.add({ uid, ...data });
    callback && callback(uid);
  };

  public close = (uid: string): void => {
    this.del(uid);
  };

  private add = (param: ToastUID): void => {
    this.toasts.push({ ...param });
  };

  private del = (uid: string): void => {
    const targetIndex = this.toasts.findIndex((toast) => toast.uid === uid);
    this.toasts.splice(targetIndex, 1);
  };
}
