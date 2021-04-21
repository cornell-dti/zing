import React from 'react'

import { InputField } from '@core/Components/InputField'
import { InputProps } from '@core/Types/FormFieldProps'

export const NumberField = ({
  fullWidth = true,
  containerStyle,
  inputStyle,
  placeholder = '0',
  value,
  onChange,
  disabled,
}: InputProps) => {
  return (
    <InputField
      fullWidth={fullWidth}
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      type="number"
    />
  )
}
