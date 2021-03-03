import React from 'react'

import { ButtonProps } from '@core/Types/FormFieldProps'
import { StyledLabel, StyledContainer } from '@core/Styles/Button.style'

export const Button = ({
  containerStyle = {},
  labelStyle = {},
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <StyledContainer style={containerStyle} onClick={onClick}>
      <StyledLabel style={labelStyle}>{label}</StyledLabel>
    </StyledContainer>
  )
}
