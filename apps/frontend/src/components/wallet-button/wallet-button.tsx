import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { EmptyWalletChange } from 'iconsax-react';
import { Button, Spacer } from '@nextui-org/react';
import { useObservableWallet } from '@hooks';
import { AccountDropdown, ChainDropdown, WalletConnectModal } from '@components';

const WalletButton: FC<WalletButtonProps> = (props: WalletButtonProps): JSX.Element => {
  const {} = props;

  const router = useRouter();
  const { account, balance, activate, deactivate } = useObservableWallet();

  const [connecting, setConnecting] = useState<boolean>(false);

  const connectModalVisible = useMemo(() => {
    return router.asPath === '/connect' && router.pathname !== '/connect';
  }, [router.asPath, router.pathname]);

  useEffect(() => {
    if (account) {
      setConnecting(false);
      goBackHandler();
    }
  }, [account]);

  const connectHandler = async () => {
    if (account) return;
    await router.push(router.pathname, '/connect', {
      scroll: false
    });
  };

  const onConnectModalClose = async () => {
    await goBackHandler();
  };

  const goBackHandler = async () => {
    await router.push(router.pathname, undefined, {
      scroll: false
    });
  };

  const activateHandler = async () => {
    setConnecting(true);
    await activate((done: boolean) => !done && setConnecting(false));
  };

  return (
    <Fragment>
      <ChainDropdown />
      <Spacer x={0.5} />
      {account ? (
        <AccountDropdown account={account} balance={balance} deactivate={() => deactivate()} />
      ) : (
        <Button
          auto
          type="button"
          ripple={false}
          color="primary"
          onClick={() => connectHandler()}
          iconRight={<EmptyWalletChange variant="Outline" size="24" />}
        >
          Connect Wallet
        </Button>
      )}
      <WalletConnectModal
        connecting={connecting}
        visible={connectModalVisible}
        onConnect={() => activateHandler()}
        onClose={() => onConnectModalClose()}
      />
    </Fragment>
  );
};

type WalletButtonProps = {};

const ObserverWalletButton = observer(WalletButton);

export { ObserverWalletButton as WalletButton };
