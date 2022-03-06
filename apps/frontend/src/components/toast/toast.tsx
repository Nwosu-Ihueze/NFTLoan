import React, { FC, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { SidebarRight } from 'iconsax-react';
import { Card, Text, useTheme } from '@nextui-org/react';
import { AnimatePresence, m, Variants } from 'framer-motion';
import { ToastUID } from '@types';
import { TOAST_TYPE } from '@enums';
import { useObservableToast } from '@hooks';
import styles from '@styles/components/toast.module.scss';

const toastMotion: Variants = {
  initial: { x: 16, opacity: 0.25, transition: { display: 'block' } },
  animate: { x: 0, opacity: 1, transition: { duration: 0.25 } },
  exit: { x: 16, opacity: 0.25, transitionEnd: { display: 'none' } }
};

const Toast: FC<ToastProps> = (props: ToastProps): JSX.Element => {
  const {} = props;

  const { isDark } = useTheme();
  const { toasts, close } = useObservableToast();

  return (
    <Fragment>
      <div className={styles.toastContainer}>
        <AnimatePresence initial={false}>
          {toasts.map(({ uid, type, message }: ToastUID) => (
            <m.div className={styles.toast} key={uid} initial="initial" animate="animate" exit="exit" variants={toastMotion} layout>
              <Card
                color={type}
                ripple={false}
                css={{ w: 260 }}
                bordered={type === TOAST_TYPE.DEFAULT}
                onClick={() => close(uid)}
                clickable
              >
                <Card.Body css={{ py: '$5', pl: '$10', pr: '$15' }}>
                  <Text color={!isDark && type === TOAST_TYPE.DEFAULT ? 'black' : 'white'} span>
                    {message}
                  </Text>
                  <SidebarRight className={styles.closeIcon} variant="Outline" size="22" />
                </Card.Body>
              </Card>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </Fragment>
  );
};

type ToastProps = {};

const ObserverToast = observer(Toast);

export { ObserverToast as Toast };
