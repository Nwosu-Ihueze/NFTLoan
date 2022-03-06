import React, { ComponentType, Fragment } from 'react';
import { NextSeo } from 'next-seo';
import { NextSeoProps } from 'next-seo/lib/types';

export const withSEO = <P, DP extends NextSeoProps = NextSeoProps>(Component: ComponentType<P>, seo: DP) => {
  const displayName = Component.displayName || Component.name || 'Component';
  const ComponentWithSEO = (props: P) => {
    return (
      <Fragment>
        <NextSeo {...seo} />
        <Component {...props} />
      </Fragment>
    );
  };
  ComponentWithSEO.displayName = `withSEO(${displayName})`;
  return ComponentWithSEO;
};
