import React from 'react'

import { colors } from '@core'
import { InputField } from '@core/Components/InputField'
import { InputProps } from '@core/Types/FormFieldProps'

export const NameField = ({
  fullWidth = true,
  key,
  MuiColor = colors.darkpurple,
  containerStyle,
  inputStyle,
  placeholder = 'Name',
  value,
  onChange,
  disabled,
}: InputProps) => {
  console.log('name field key: ' + key)
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
    />
  )
}
