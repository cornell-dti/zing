import React from 'react'

import { colors } from '@core'
import { InputField } from '@core/Components/InputField'
import { InputProps } from '@core/Types/FormFieldProps'

export const NameField = ({
  fullWidth = true,
  key,
  MuiColor = colors.purple,
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
      fullWidth={fullWidth}
      key={key}
      MuiColor={MuiColor}
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
