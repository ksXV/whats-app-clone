import * as React from "react";
import "./input-box.styles.scss";
interface InputBoxProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  type: string;
  labelClass?: string;
}
const InputBox: React.FC<InputBoxProps> = ({
  labelClass,
  label,
  ...otherProps
}) => {
  return (
    <>
      {label ? <label className={labelClass}>{label}</label> : null}
      <input {...otherProps} />
    </>
  );
};

export default InputBox;
