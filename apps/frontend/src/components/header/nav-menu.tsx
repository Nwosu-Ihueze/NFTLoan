import React, { FC, Fragment } from 'react';
import { MenuItem } from '@components';
import styles from '@styles/components/header.module.scss';

export const NavMenu: FC<NavMenuProps> = (props: NavMenuProps): JSX.Element => {
  const {} = props;

  return (
    <Fragment>
      <div className={styles.navManu}>
        <MenuItem href="/">About</MenuItem>
        <MenuItem href="/">Community</MenuItem>
      </div>
    </Fragment>
  );
};

type NavMenuProps = {};
