import React from 'react'

import { InputField } from '@core/Components/InputField'
import { InputProps } from '@core/Types/FormFieldProps'

export const YearField = ({
  containerStyle,
  inputStyle,
  placeholder = 'Graduation Year',
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
      placeholder={placeholder}
      disabled={disabled}
      type="number"
    />
  )
}
