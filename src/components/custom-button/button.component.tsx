import * as React from "react";

interface ICustomButtonProps extends React.HTMLAttributes<HTMLElement> {}

const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  ...otherProps
}) => {
  return <button {...otherProps}>{children}</button>;
};

export default CustomButton;
