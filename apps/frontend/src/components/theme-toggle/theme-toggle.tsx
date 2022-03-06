import React, { FC, Fragment } from 'react';
import { m } from 'framer-motion';
import { useTheme as useNextTheme } from 'next-themes';
import { Avatar, useTheme } from '@nextui-org/react';
import { MotionMoon, MotionSun } from '@components/motion-icon';
import styles from '@styles/components/icon.module.scss';

export const ThemeToggle: FC<ThemeToggleProps> = (props: ThemeToggleProps): JSX.Element => {
  const {} = props;

  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Fragment>
      <Avatar
        squared
        pointer
        onClick={() => toggleTheme()}
        icon={
          <m.div className={styles.iconContainer} animate={isDark ? 'dark' : 'light'}>
            {isDark ? <MotionSun /> : <MotionMoon />}
          </m.div>
        }
      />
    </Fragment>
  );
};

type ThemeToggleProps = {};
