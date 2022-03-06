import React, { FC, Fragment } from 'react';
import { BigNumber } from 'ethers';
import gradientAvatar from 'gradient-avatar';
import { formatEther } from '@ethersproject/units';
import { LogoutCurve, WalletMoney } from 'iconsax-react';
import { Content, Root, Trigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, Button, Card, keyframes, Link, Spacer, styled } from '@nextui-org/react';
import styles from '@styles/components/walletbutton.module.scss';

const DropdownMenu = Root;
const DropdownMenuTrigger = Trigger;
const DropdownMenuContent = Content;

export const AccountDropdown: FC<AccountDropdownProps> = (props: AccountDropdownProps): JSX.Element => {
  const { account, balance, deactivate } = props;

  const accountFormatter = (account: string) => {
    const dots = '...';
    const prefix = account.substring(0, 5);
    const suffix = account.slice(account.length - 4);
    return prefix + dots + suffix;
  };

  const balanceFormatter = (balance: BigNumber | undefined) => {
    if (!balance) return '0.00';
    return Math.round((parseFloat(formatEther(balance)) + Number.EPSILON) * 10000) / 10000;
  };

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            ripple={false}
            light={!!account}
            css={{ pr: 0 }}
            color={!account ? 'gradient' : 'default'}
            iconRight={<Avatar size="sm" src={`data:image/svg+xml;utf8,${escape(gradientAvatar(account.substring(0, 6), 24))}`} />}
            auto
          >
            {accountFormatter(account)}
          </Button>
        </DropdownMenuTrigger>
        <StyledContent sideOffset={15}>
          <Card shadow={false} animated={false} bordered>
            <Link block color="text" className={styles.dropdownItem}>
              <WalletMoney variant="Outline" size="24" />
              {balanceFormatter(balance)}
            </Link>
            <Spacer y={0.5} />
            <Link block color="warning" className={styles.dropdownItem} onClick={() => deactivate()}>
              <LogoutCurve variant="Outline" size="24" />
              Logout
            </Link>
          </Card>
        </StyledContent>
      </DropdownMenu>
    </Fragment>
  );
};

type AccountDropdownProps = {
  account: string;
  balance?: BigNumber;
  deactivate: () => void;
};

const slideDown = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
});

const slideUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
});

// @ts-ignore
const StyledContent = styled(DropdownMenuContent, {
  animationDuration: '250ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  animationFillMode: 'forwards',
  '&[data-side="top"]': { animationName: slideUp },
  '&[data-side="bottom"]': { animationName: slideDown }
});
