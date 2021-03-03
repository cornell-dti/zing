import React from 'react'

import { InputField } from '@core/Components/InputField'
import { InputProps } from '@core/Types/FormFieldProps'

export const EmailField = ({
  containerStyle,
  inputStyle,
  placeholder = 'Email',
  value,
  onKeyPress,
  onChange,
  disabled,
}: InputProps) => {
  return (
    <InputField
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      onKeyPress={onKeyPress}
      value={value}
      onChange={onChange}
      type="email"
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
