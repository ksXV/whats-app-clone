import * as React from "react";
interface InputBoxProps extends React.HTMLAttributes<HTMLElement> {
  type: string;
}
const InputBox: React.FC<InputBoxProps> = ({ ...otherProps }) => {
  return <input {...otherProps} />;
};

export default InputBox;
