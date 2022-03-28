import * as React from "react";
import "./button.styles.scss";
interface ICustomButtonProps extends React.HTMLAttributes<HTMLElement> {}
const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <button className="custom-button" {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
