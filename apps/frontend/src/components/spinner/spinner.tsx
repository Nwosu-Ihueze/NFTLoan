import React, { ComponentProps, FC, Fragment } from 'react';
import { Loading } from '@nextui-org/react';

export const Spinner: FC<SpinnerProps> = (props: SpinnerProps): JSX.Element => {
  const { ...rest } = props;

  return (
    <Fragment>
      <Loading size="sm" {...rest} />
    </Fragment>
  );
};

type SpinnerProps = ComponentProps<typeof Loading>;
