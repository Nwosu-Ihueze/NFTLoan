import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { withSEO } from '@hocs';
import { GradientCard, MemoDiscord } from '@components';
import { Button, Text } from '@nextui-org/react';

const HomePage: NextPage<HomePageProps> = (): JSX.Element => {
  return (
    <Fragment>
      <GradientCard>
        <Text h3 size="38px" weight="bold" css={{ letterSpacing: '$normal', textAlign: 'center' }}>
          Join our community
        </Text>
        <Text span size="18px" weight="normal" css={{ textAlign: 'center' }}>
          Meet the lenders team, get supports and updates on the platform, and more...
        </Text>
        <Button color="secondary" ripple={false} iconRight={<MemoDiscord />} auto rounded>
          Lunch Discord
        </Button>
      </GradientCard>
    </Fragment>
  );
};

type HomePageProps = {};

export default withSEO(HomePage, {
  title: 'Home'
});
