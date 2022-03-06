import React, { FC, Fragment } from 'react';
import { Link, Modal, styled, Text } from '@nextui-org/react';
import { CoinbaseWalletLogo, MetaMaskLogo, WalletCard, WalletConnectLogo } from '@components';

export const WalletConnectModal: FC<WalletConnectModalProps> = (props: WalletConnectModalProps): JSX.Element => {
  const { visible, connecting, onConnect, onClose } = props;

  return (
    <Fragment>
      <StyledModal
        open={visible}
        width="420px"
        css={{ bg: '$accents1' }}
        onClose={() => onClose && onClose()}
        blur
        animated
        autoMargin
        closeButton
      >
        <Modal.Header>
          <Text size={18} weight="normal">
            Choose your preferred wallet
          </Text>
        </Modal.Header>
        <Modal.Body css={{ py: '$10' }}>
          <WalletCard name="MetaMaskButton" icon={MetaMaskLogo} connecting={connecting} onClick={() => onConnect && onConnect()}>
            MetaMask
          </WalletCard>
          <WalletCard name="WalletConnectButton" icon={WalletConnectLogo} disable>
            WalletConnect
          </WalletCard>
          <WalletCard name="CoinbaseWalletButton" icon={CoinbaseWalletLogo} disable>
            Coinbase Wallet
          </WalletCard>
        </Modal.Body>
        <Modal.Footer justify="flex-end">
          <Link href="https://metamask.io/download" target="_blank" block icon>
            Download MetaMask
          </Link>
        </Modal.Footer>
      </StyledModal>
    </Fragment>
  );
};

type WalletConnectModalProps = {
  visible: boolean;
  connecting?: boolean;
  onClose?: () => void;
  onConnect?: () => void;
};

const StyledModal = styled(Modal);
