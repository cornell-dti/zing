import React from 'react'

import { RadioButtonProps } from '@core/Types/FormFieldProps'
import { StyledLabel, StyledContainer } from '@core/Styles/RadioButton.style'
import Radio, { RadioProps } from '@mui/material/Radio'
import { colors } from '@core'
import withStyles from '@mui/styles/withStyles'

const PurpleRadio = withStyles({
  root: {
    color: colors.purple,
    '&$checked': {
      color: colors.purple,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

export const RadioButton = ({
  currentAnswer,
  onClick,
  label,
  value,
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

  return (
    <StyledLabel>
      <StyledContainer style={containerStyle}>
        <PurpleRadio
          checked={value === currentAnswer}
          onChange={onClick}
          value={value}
          name="radio-button-mui"
          inputProps={{ 'aria-label': value }}
        />
        <div>{label}</div>
      </StyledContainer>
    </StyledLabel>
  )
}
