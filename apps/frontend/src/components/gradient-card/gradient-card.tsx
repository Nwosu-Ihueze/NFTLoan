import React, { ComponentProps, FC, Fragment, ReactNode } from 'react';
import { Card } from '@nextui-org/react';

export const GradientCard: FC<GradientCardProps> = (props: GradientCardProps): JSX.Element => {
  const { children, css, ...reset } = props;

  return (
    <Fragment>
      <Card css={{ transition: '$default', br: '$base', p: '$2', $$cardColor: '$colors$gradientCardBackground', ...css }} {...reset}>
        <Card.Body
          css={{
            dflex: 'center',
            fd: 'column',
            p: '$14',
            gap: '$14',
            br: '$base',
            transition: '$default',
            borderWidth: '$light',
            borderStyle: 'solid',
            borderColor: '$gradientCardBorder',
            bg: '$gradientCardBodyBackground'
          }}
        >
          {children}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

type GradientCardProps = ComponentProps<typeof Card> & {
  children: ReactNode;
};
