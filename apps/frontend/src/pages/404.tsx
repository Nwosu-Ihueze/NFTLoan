import React, { FC, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Button, Col, Container, Row, Spacer, Text } from '@nextui-org/react';
import { withSEO } from '@hocs';
import { GradientCard } from '@components';
import styles from '@styles/pages/error.module.scss';

const Error404Page: FC<Error404PageProps> = (props: Error404PageProps): JSX.Element => {
  const {} = props;

  const router = useRouter();

  const homeHandler = async () => {
    await router.push('/');
  };

  const backHandler = () => {
    router.back();
  };

  return (
    <Fragment>
      <div className={styles.notFound}>
        <GradientCard css={{ mw: '550px' }}>
          <Text h4>404</Text>
          <Text span>Page Not Found</Text>
          <Container display="flex" justify="center" alignContent="center" gap={0}>
            <Col>
              <Row justify="center" align="center">
                <Button color="primary" onClick={() => backHandler()} ghost rounded>
                  Go Back
                </Button>
              </Row>
              <Spacer />
              <Row justify="center" align="center">
                <Button color="secondary" onClick={() => homeHandler()} rounded>
                  Home
                </Button>
              </Row>
            </Col>
          </Container>
        </GradientCard>
      </div>
    </Fragment>
  );
};

type Error404PageProps = {};

export default withSEO(Error404Page, {
  title: 'Page Not Found 404'
});
