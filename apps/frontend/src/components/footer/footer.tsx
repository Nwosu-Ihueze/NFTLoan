import React, { FC, Fragment } from 'react';
import { Copyright } from 'iconsax-react';
import { Col, Container, Row, Text } from '@nextui-org/react';
import { seoConfig } from '@utils';
import { ThemeToggle } from '@components';
import styles from '@styles/components/footer.module.scss';

export const Footer: FC<FooterProps> = (props: FooterProps): JSX.Element => {
  const {} = props;

  return (
    <Fragment>
      <footer className={styles.footer}>
        <Container display="flex" alignItems="center" wrap="nowrap" md>
          <Col className={styles.copyright}>
            <Row justify="flex-start" align="center">
              <Copyright variant="Outline" size="16" />
              <Text css={{ m: 0, ml: '$1' }} span small>
                {seoConfig.defaultTitle}
              </Text>
            </Row>
          </Col>
          <Col>
            <Row justify="flex-end" align="center">
              <ThemeToggle />
            </Row>
          </Col>
        </Container>
      </footer>
    </Fragment>
  );
};

type FooterProps = {};
