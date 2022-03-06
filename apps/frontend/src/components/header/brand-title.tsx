import React, { FC, Fragment, ReactNode } from 'react';
import NextLink from 'next/link';
import { Link, Text } from '@nextui-org/react';

export const BrandTitle: FC<BrandProps> = (props: BrandProps): JSX.Element => {
  const { children } = props;

  return (
    <Fragment>
      <NextLink href="/" passHref>
        <Link>
          <Text
            size="26px"
            weight="semibold"
            // css={{ whiteSpace: 'nowrap', m: 0, textGradient: '45deg, #f83a3a 10%, #f13dd4 50%, #7000ff 90%' }}
            span
          >
            {children}
          </Text>
        </Link>
      </NextLink>
    </Fragment>
  );
};

type BrandProps = {
  children: ReactNode;
};
