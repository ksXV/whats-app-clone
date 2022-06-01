import * as React from "react";

import "./input-box.styles.scss";

interface InputBoxProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  type: string;
  labelClass?: string;
  required: boolean;
}

const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
  ({ labelClass, label, required, ...otherProps }, ref) => {
    return (
      <>
        {label ? <label className={labelClass}>{label}</label> : null}
        <input ref={ref} required={required} {...otherProps} />
      </>
    );
  }
);

export default InputBox;
