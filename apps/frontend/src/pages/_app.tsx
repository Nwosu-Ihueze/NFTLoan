import React, { Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo as NextDefaultSEO } from 'next-seo';
import { NextUIProvider as UIProvider } from '@nextui-org/react';
import { domMax, LazyMotion, MotionConfig } from 'framer-motion';
import { DefaultLayout } from '@layouts';
import { seoConfig, themeConfig } from '@utils';
import '@styles/globals.scss';

const NFTLoanApplication: NextPage<AppProps> = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return (
    <Fragment>
      <ThemeProvider {...themeConfig}>
        <UIProvider>
          <Head>
            <base href="/" />
            <meta charSet="utf-8" />
            <title>{seoConfig.title}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content={seoConfig.description} />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="keywords" content="NFTs Collateralized Loan, Loans, NFTs,Polygon, Blockchain" />
            <link as="style" type="text/css" rel="stylesheet preload prefetch" href="/assets/fonts/fonts.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
          </Head>
          <NextDefaultSEO {...seoConfig} />
          <MotionConfig reducedMotion="user">
            <LazyMotion features={domMax} strict>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </LazyMotion>
          </MotionConfig>
        </UIProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default NFTLoanApplication;
