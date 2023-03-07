import * as React from 'react';
import styled from 'styled-components';

interface IButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  handleClick?: () => void;
  variant?:
    | 'primary'
    | 'secondary'
    | 'alert'
    | 'success'
    | 'failed'
    | 'disabled';
}

export default function RippleButton({
  handleClick,
  children,
  variant = 'primary',
  className,
  ...rest
}: IButtonProps) {
  if("onClick" in rest){
    throw Error("You can not pass onClick props to the component RippleButton.tsx. Pass handleClick prop instead")
  }
  const id = React.useId();
  const BtnVariants = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    failed: FailedButton,
    alert: AlertButton,
    disabled: DisabledButton,
    success: SuccessButton,
  };
  const Btn = BtnVariants[variant];

  return (
    <Btn
      data-btn-id={id}
      className={`${'ripple-btn'} ${variant} ${className && className}`}
      ref={() => {
        (globalThis as any)?.TargetMap.set(id, handleClick);
      }}
      {...rest}
    >
      {children}
    </Btn>
  );
}

const StyledBtn = styled.button`
  position: relative;
  overflow: hidden;
  border: none !important;
  z-index: 1;
  outline: none !important;
  min-width: 100px;

  --primary: hsl(192, 100%, 45%);
  --primary-ripple: hsl(192, 100%, 70%);

  --secondary: hsl(209, 100%, 45%);
  --secondary-ripple: hsl(209, 100%, 70%);

  --success: hsl(147, 100%, 45%);
  --success-ripple: hsl(147, 100%, 70%);

  --failed: hsl(22, 100%, 45%);
  --failed-ripple: hsl(22, 100%, 70%);

  span {
    --width: 0px;
    --height: 0px;
    width: 0;
    height: 0;
    transition: all 0.5s linear;
    transform: translate(-50%, -50%) scale(3);
    position: absolute;
    border-radius: 50%;
    z-index: -1;
  }

  @keyframes ripple {
    0% {
      width: 0;
      height: 0;
    }
    50% {
      width: var(--width);
      height: var(--height);
      transform: translate(-50%, -50%) scale(3);
    }
    100% {
      width: var(--width);
      height: var(--height);
      opacity: 0.1;
    }
  }
`;
const PrimaryButton = styled(StyledBtn)`
  background-color: var(--primary);
  span {
    background-color: var(--primary-ripple);
  }
`;
const SecondaryButton = styled(StyledBtn)`
  background-color: var(--secondary);
  span {
    background-color: var(--secondary-ripple);
  }
`;
const FailedButton = styled(StyledBtn)`
  background-color: var(--failed);
  span {
    background-color: var(--failed-ripple);
  }
`;
const DisabledButton = styled(StyledBtn)`
  background-color: var(--disabled);
  span {
    background-color: var(--disabled-ripple);
  }
`;
const SuccessButton = styled(StyledBtn)`
  background-color: var(--success);
  span {
    background-color: var(--success-ripple);
  }
`;
const AlertButton = styled(StyledBtn)`
  background-color: var(--alert);
  span {
    background-color: var(--alert-ripple);
  }
`;
