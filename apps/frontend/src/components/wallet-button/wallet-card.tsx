import React, { ComponentProps, FC, Fragment, ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'iconsax-react';
import { Card, Container, styled, Text } from '@nextui-org/react';
import { Badge, Spinner } from '@components';
import styles from '@styles/components/walletbutton.module.scss';

export const WalletCard: FC<WalletCardProps> = (props: WalletCardProps): JSX.Element => {
  const { icon, name, disable, connecting, children, ...rest } = props;

  return (
    <Fragment>
      <Card
        key={name}
        css={{ bg: disable ? '$accents1' : '$background' }}
        ripple={false}
        shadow={false}
        clickable={!disable}
        className={styles.walletCard}
        animated
        bordered
        hoverable={!disable}
        {...rest}
      >
        <Container display="flex" direction="row" justify="flex-start" alignItems="center" wrap="nowrap" gap={0}>
          <StyledImage
            className={styles.walletCardIcon}
            css={{ opacity: disable ? 0.6 : 1 }}
            alt={name}
            src={icon}
            width={42}
            height={42}
          />
          <Text className={styles.walletCardName} css={{ m: 0, pl: 8, ml: 8, opacity: disable ? 0.6 : 1 }} weight="normal" size={16}>
            {children}
          </Text>
          {disable && <Badge disable>COMING SOON</Badge>}
          {connecting && <Spinner type="gradient" size="xs" />}
          {!disable && !connecting && <ArrowRight variant="Outline" size="20" />}
        </Container>
      </Card>
    </Fragment>
  );
};

type WalletCardProps = {
  name: string;
  icon: string;
  disable?: boolean;
  connecting?: boolean;
  children: ReactNode;
} & ComponentProps<typeof Card>;

const StyledImage = styled(Image);
