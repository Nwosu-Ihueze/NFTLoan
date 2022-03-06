import React, { FC, Fragment } from 'react';
import { Content, Root, Trigger } from '@radix-ui/react-dropdown-menu';
import { Button, Card, keyframes, Link, Spacer, styled } from '@nextui-org/react';
import { Ethereum, Polygon } from 'iconsax-react';
import styles from '@styles/components/walletbutton.module.scss';

const DropdownMenu = Root;
const DropdownMenuTrigger = Trigger;
const DropdownMenuContent = Content;

export const ChainDropdown: FC<ChainDropdownProps> = (props: ChainDropdownProps): JSX.Element => {
  const {} = props;

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            ripple={false}
            color="secondary"
            icon={<Ethereum color="currentColor" variant="Outline" size="22" />}
            flat
            auto
          />
        </DropdownMenuTrigger>
        <StyledContent sideOffset={15}>
          <Card shadow={false} animated={false} bordered>
            <Link className={styles.dropdownItem} color="secondary" block>
              <Polygon variant="Outline" size="24" />
              Polygon
            </Link>
            <Spacer y={0.5} />
            <Link className={styles.dropdownItem} color="secondary" block>
              <Ethereum variant="Outline" size="24" />
              Ethereum
            </Link>
          </Card>
        </StyledContent>
      </DropdownMenu>
    </Fragment>
  );
};

type ChainDropdownProps = {};

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
