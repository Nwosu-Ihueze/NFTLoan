import React, { Fragment, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { withSEO } from '@hocs';
import { WalletConnectModal } from '@components';
import { useObservableWallet } from '@hooks';

const ConnectPage: NextPage<ConnectPageProps> = (): JSX.Element => {
  const router = useRouter();
  const { account, activate } = useObservableWallet();

  const [connecting, setConnecting] = useState<boolean>(false);

  useEffect(() => {
    router.prefetch('/');
  }, []);

  useEffect(() => {
    account && backToHomePageHandler();
  }, [account]);

  const onConnectHandler = async () => {
    setConnecting(true);
    await activate((done: boolean) => !done && setConnecting(false));
  };

  const backToHomePageHandler = async () => {
    await router.push('/', undefined, {
      scroll: false
    });
  };

  return (
    <Fragment>
      <WalletConnectModal
        visible={true}
        connecting={connecting}
        onConnect={() => onConnectHandler()}
        onClose={() => backToHomePageHandler()}
      />
    </Fragment>
  );
};

type ConnectPageProps = {};

const ObserverConnectPage = observer(ConnectPage);

export default withSEO(ObserverConnectPage, {
  title: 'Connect'
});
