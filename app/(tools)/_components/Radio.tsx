"use client";

import { ChangeEventHandler } from "react";

export default function Radio({
  name,
  value,
  className,
  defaultChecked,
  checked,
  readOnly,
  disabled,
  onChange,
}: {
  name: string;
  value: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      className={className}
      checked={checked}
      defaultChecked={defaultChecked}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      ref={(input) => {
        if (input && defaultChecked) {
          input.checked = true;
        }
      }}
    />
  );
}
