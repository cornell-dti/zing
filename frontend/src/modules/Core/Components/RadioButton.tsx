import React from 'react'

import { RadioButtonProps } from '@core/Types/FormFieldProps'
import { StyledLabel, StyledContainer } from '@core/Styles/RadioButton.style'
import background from '@assets/img/radiobuttonbackground.svg'

export const RadioButton = ({
  onClick,
  onClickLabel,
  value,
  name,
}: RadioButtonProps) => {
  const containerStyle = {
    display: 'flex',
    padding: '0 1rem',

    background: '#FFFFFF',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '11px',
    marginBottom: '1rem',
  }
  // nested this way so that the whole container is clickable
  return (
    <StyledLabel>
      <StyledContainer style={containerStyle}>
        <input
          type="radio"
          value={value}
          name={name}
          onChange={onClick}
          style={radioStyle}
        />
        <div>{value}</div>
      </StyledContainer>
    </StyledLabel>
  )
}

const radioStyle = {
  margin: '1rem',

  cursor: 'pointer',
  color: 'white',
}
