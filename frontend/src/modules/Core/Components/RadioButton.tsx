import React from 'react'

import { RadioButtonProps } from '@core/Types/FormFieldProps'
import { StyledLabel, StyledContainer } from '@core/Styles/RadioButton.style'
import background from '@assets/img/radiobuttonbackground.svg'

export const RadioButton = ({
  currentAnswer,
  onClick,
  setClickedIndex,
  index,
  label,
  value,
  key,
  checked,
}: RadioButtonProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 1rem',

    background: '#FFFFFF',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '11px',
    marginBottom: '1rem',
  }
  function handleOnClick(e: React.ChangeEvent<HTMLInputElement>) {
    onClick(e)
    setClickedIndex(index)
    console.log(index)
  }
  // if the value is the same as the currentAnswer, check by default
  // (pre-existing answer from before)
  if (value === currentAnswer) {
    return (
      <StyledLabel>
        {/* {nested this way so that the whole container is clickable} */}
        <StyledContainer style={containerStyle}>
          <input
            type="radio"
            value={value}
            onChange={handleOnClick}
            style={radioStyle}
            name="RadioButton"
            key={key}
            defaultChecked
          />
          <div>{label}</div>
        </StyledContainer>
      </StyledLabel>
    )
  } else {
    // no match for currentAnswer with values
    return (
      <StyledLabel>
        <StyledContainer style={containerStyle}>
          <input
            type="radio"
            value={value}
            onChange={handleOnClick}
            style={radioStyle}
            name="RadioButton"
            key={key}
          />
          <div>{label}</div>
        </StyledContainer>
      </StyledLabel>
    )
  }
}

const radioStyle = {
  margin: '1rem',
  cursor: 'pointer',
  color: 'white',
}
