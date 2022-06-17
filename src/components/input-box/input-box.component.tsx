import * as React from "react";

import "./input-box.styles.scss";

interface InputBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  labelClass?: string;
  required: boolean;
  value?: string;
  isDisabled?: boolean;
}

const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
  ({ labelClass, label, required, value, isDisabled, ...otherProps }, ref) => {
    return (
      <>
        {label ? <label className={labelClass}>{label}</label> : null}
        <input
          ref={ref}
          required={required}
          {...otherProps}
          value={value}
          disabled={isDisabled}
        />
      </>
    );
  }
);

export default InputBox;
