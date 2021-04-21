import React from 'react'

import { InputField } from '@core/Components/InputField'
import { InputProps } from '@core/Types/FormFieldProps'

export const NameField = ({
  containerStyle,
  inputStyle,
  placeholder = 'Name',
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
      placeholder={placeholder}
      disabled={disabled}
      error={error}
    />
  )
}
