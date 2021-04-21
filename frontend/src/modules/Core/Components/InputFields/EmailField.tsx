import React from 'react'

import { InputField } from '@core/Components/InputField'
import { InputProps } from '@core/Types/FormFieldProps'

export const EmailField = ({
  containerStyle,
  inputStyle,
  placeholder = 'Email',
  value,
  onChange,
  disabled,
  error,
}: InputProps) => {
  return (
    <InputField
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      value={value}
      onChange={onChange}
      type="email"
      placeholder={placeholder}
      disabled={disabled}
      error={error}
    />
  )
}
