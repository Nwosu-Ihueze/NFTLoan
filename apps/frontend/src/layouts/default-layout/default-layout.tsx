import React, { FC, Fragment, ReactNode } from 'react';
import { Container } from '@nextui-org/react';
import { Footer, Header, Toast } from '@components';
import styles from '@styles/layouts/default.module.scss';

export const DefaultLayout: FC<DefaultLayoutProps> = (props: DefaultLayoutProps): JSX.Element => {
  const { children } = props;

  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <Container
          wrap="nowrap"
          display="flex"
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          css={{ gap: '$20' }}
          md
        >
          {children}
        </Container>
      </main>
      <Footer />
      <Toast />
    </Fragment>
  );
};

interface DefaultLayoutProps {
  children: ReactNode;
}
