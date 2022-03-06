import React, { FC, Fragment, ReactNode } from 'react';
import classNames from 'classnames';
import { Text } from '@nextui-org/react';
import styles from '@styles/components/badge.module.scss';

export const Badge: FC<BadgeProps> = (props: BadgeProps): JSX.Element => {
  const { disable, children } = props;

  return (
    <Fragment>
      <Text weight="normal" className={classNames(styles.badge, disable && styles.badgeDisable)} span>
        {children}
      </Text>
    </Fragment>
  );
};

type BadgeProps = {
  disable?: boolean;
  children: ReactNode;
};
