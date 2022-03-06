import { ToastDuration } from '@types';
import { useObservableToast } from '@hooks';

export const useToast = () => {
  const { show, close } = useObservableToast();
  const toast = ({ data, duration }: ToastDuration) => {
    return show({ data, callback: (uid: string) => duration && setTimeout(() => close(uid), duration) });
  };
  return { toast };
};
