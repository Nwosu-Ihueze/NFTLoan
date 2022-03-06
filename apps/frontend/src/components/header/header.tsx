import React, { FC, Fragment } from 'react';
import { Col, Container, Row, styled } from '@nextui-org/react';
import { seoConfig } from '@utils';
import { BrandTitle, NavMenu, WalletButton } from '@components';
import styles from '@styles/components/header.module.scss';

export const Header: FC<HeaderProps> = (props: HeaderProps): JSX.Element => {
  const {} = props;

  return (
    <Fragment>
      <StyledHeader css={{ transition: '$default', bg: '$headerBackground' }} className={styles.header}>
        <Container as="nav" display="flex" alignItems="center" wrap="nowrap" md>
          <Col>
            <Row justify="flex-start" align="center">
              <BrandTitle>{seoConfig.defaultTitle}</BrandTitle>
            </Row>
          </Col>
          <Col>
            <Row justify="center" align="center">
              <NavMenu />
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end" align="center">
              <WalletButton />
            </Row>
          </Col>
        </Container>
      </StyledHeader>
    </Fragment>
  );
};

const StyledHeader = styled('header');

type HeaderProps = {};
