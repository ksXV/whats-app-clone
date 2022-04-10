import * as React from "react";
import "./input-box.styles.scss";
interface InputBoxProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  type: string;
  labelClass?: string;
  required: boolean;
}
const InputBox: React.FC<InputBoxProps> = ({
  labelClass,
  label,
  required,
  ...otherProps
}) => {
  return (
    <>
      {label ? <label className={labelClass}>{label}</label> : null}
      <input required={required} {...otherProps} />
    </>
  );
};

export default InputBox;
