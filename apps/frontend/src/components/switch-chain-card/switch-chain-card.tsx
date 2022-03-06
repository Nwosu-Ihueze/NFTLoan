import React, { FC, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Spacer, Text } from '@nextui-org/react';
import { useObservableWallet } from '@hooks';
import styles from '@styles/pages/index.module.scss';

const SwitchChainCard: FC<InfoCardProps> = (props: InfoCardProps): JSX.Element => {
  const {} = props;

  const { switchEthereumChain } = useObservableWallet();

  const changeNetworkHandler = async () => {
    await switchEthereumChain({ chainId: 80001 });
  };

  return (
    <Fragment>
      <Card css={{ mt: 50, mw: 500 }}>
        <div className={styles.inputs}>
          <Text span color="warning">
            Please connect to the Polygon Mumbai Testnet
          </Text>
          <Spacer y={2} />
          <Button color="gradient" ripple={false} onClick={() => changeNetworkHandler()} bordered>
            switch Network
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

type InfoCardProps = {};

const ObserverSwitchChainCard = observer(SwitchChainCard);

export { ObserverSwitchChainCard as SwitchChainCard };
