import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { CssBaseline } from '@nextui-org/react';
import Document, { DocumentContext, DocumentInitialProps, DocumentProps, Head, Html, Main, NextScript } from 'next/document';

const NFTLoanDocument: NextPage<DocumentProps, DocumentInitialProps> = (props: DocumentProps): JSX.Element => {
  const { locale } = props;

  return (
    <Html dir="ltr" lang={locale}>
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

NFTLoanDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: <Fragment>{initialProps.styles}</Fragment>
  };
};

export default NFTLoanDocument;
