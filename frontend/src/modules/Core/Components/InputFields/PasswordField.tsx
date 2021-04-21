import React from 'react'

import { InputField } from '@core/Components/InputField'
import { InputProps } from '@core/Types/FormFieldProps'

export const PasswordField = ({
  containerStyle,
  inputStyle,
  placeholder = 'Password',
  value,
  onChange,
  disabled,
}: InputProps) => {
  return (
    <InputField
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      value={value}
      onChange={onChange}
      type="password"
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
