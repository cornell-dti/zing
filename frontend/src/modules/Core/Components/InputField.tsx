import React from 'react'

import { InputProps } from '@core/Types/FormFieldProps'
import { StyledInput, StyledContainer } from '@core/Styles/InputField.style'

export const InputField = ({
  containerStyle = {},
  inputStyle = {},
  type = 'input',
  placeholder,
  disabled = false,
  value,
  onChange,
  onKeyPress = () => {},
}: InputProps) => {
  return (
    <StyledContainer style={containerStyle}>
      <StyledInput
        onKeyPress={onKeyPress}
        disabled={disabled}
        style={inputStyle}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledContainer>
  )
}
