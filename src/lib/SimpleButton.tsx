import * as React from 'react';

interface IButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  handleClick?: () => void;
}

export default function SimpleButton({ handleClick, children, className, ...rest }: IButtonProps) {
    if("onClick" in rest){
        throw Error("You can not pass onClick props to the component SimpleButton.tsx. Pass handleClick prop instead")
    }
  const id = React.useId();

  return (
    <button
      data-btn-id={id}
      className={`simple-btn ${className && className}`}
      ref={() => {
        (globalThis as any)?.TargetMap.set(id, handleClick);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}