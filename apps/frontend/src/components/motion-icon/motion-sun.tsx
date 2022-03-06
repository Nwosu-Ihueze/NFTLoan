import React, { FC, Fragment } from 'react';
import { m, Transition, Variants } from 'framer-motion';
import styles from '@styles/components/icon.module.scss';

const transition: Transition = {
  type: 'spring',
  mass: 0.5,
  damping: 10,
  duration: 250,
  stiffness: 220,
  delayChildren: 0.5,
  staggerChildren: 0.2
};

const raysVariants: Variants = {
  initial: { rotate: -45 },
  animate: { rotate: 0, transition }
};

const coreVariants: Variants = {
  initial: { scale: 0.6 },
  animate: { scale: 1, transition }
};

export const MotionSun: FC<MotionSunProps> = (props: MotionSunProps): JSX.Element => {
  const {} = props;

  return (
    <Fragment>
      <m.svg className={styles.icon} key="sun" fill="none" viewBox="0 0 24 24" style={{ originX: '50%', originY: '50%' }}>
        <m.circle
          r="5.75375"
          cx="11.9998"
          cy="11.9998"
          initial="initial"
          animate="animate"
          fill="currentColor"
          variants={coreVariants}
        />
        <m.g initial="initial" animate="animate" variants={raysVariants}>
          <circle cx="3.08982" cy="6.85502" r="1.71143" transform="rotate(-60 3.08982 6.85502)" fill="currentColor" />
          <circle cx="3.0903" cy="17.1436" r="1.71143" transform="rotate(-120 3.0903 17.1436)" fill="currentColor" />
          <circle cx="12" cy="22.2881" r="1.71143" fill="currentColor" />
          <circle cx="20.9101" cy="17.1436" r="1.71143" transform="rotate(-60 20.9101 17.1436)" fill="currentColor" />
          <circle cx="20.9101" cy="6.8555" r="1.71143" transform="rotate(-120 20.9101 6.8555)" fill="currentColor" />
          <circle cx="12" cy="1.71143" r="1.71143" fill="currentColor" />
        </m.g>
      </m.svg>
    </Fragment>
  );
};

type MotionSunProps = {};
