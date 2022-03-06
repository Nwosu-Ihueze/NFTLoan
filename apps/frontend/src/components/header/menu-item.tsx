import React, { FC, Fragment, ReactNode } from 'react';
import NextLink from 'next/link';
import { Link, Text } from '@nextui-org/react';
import styles from '@styles/components/header.module.scss';

export const MenuItem: FC<MenuItemProps> = (props: MenuItemProps): JSX.Element => {
  const { href, children } = props;

  return (
    <Fragment>
      <NextLink href={href} passHref>
        <Link className={styles.manuItem} color="secondary" block>
          <Text css={{ transition: '$default' }} span>
            {children}
          </Text>
        </Link>
      </NextLink>
    </Fragment>
  );
};

type MenuItemProps = {
  href: string;
  children: ReactNode;
};
