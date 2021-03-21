import React from 'react'

import { Button } from '@core/Components/Button'
import { ButtonProps, RadioButtonProps } from '@core/Types/FormFieldProps'
import { StyledLabel, StyledContainer } from '@core/Styles/RadioButton.style'
import background from '@assets/img/radiobuttonbackground.svg'
import { colors } from '@core'

export const RadioButton = ({
  onClick,
  onClickLabel,
  value,
  name,
}: RadioButtonProps) => {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    width: 548,
  }
  return (
    <StyledContainer style={containerStyle}>
      <input
        type="radio"
        value={value}
        name={name}
        onChange={onClick}
        style={radioStyle}
      />
      <StyledLabel> {value} </StyledLabel>
    </StyledContainer>
  )
}

const radioStyle = {
  margin: 20,
  marginTop: 26,
  marginBottom: 24,
  cursor: 'pointer',
  color: 'white',
}
