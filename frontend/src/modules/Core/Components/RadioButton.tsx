import React from 'react'

import { styled } from '@mui/material/styles'

import { RadioButtonProps } from '@core/Types/FormFieldProps'
import { StyledLabel, StyledContainer } from '@core/Styles/RadioButton.style'
import Radio, { RadioProps } from '@mui/material/Radio'
import { colors } from '@core'
const PREFIX = 'RadioButton'

const classes = {
  root: `${PREFIX}-root`,
  checked: `${PREFIX}-checked`,
}

const StyledStyledLabel = styled(StyledLabel)({
  [`& .${classes.root}`]: {
    color: colors.purple,
    '&.Mui-checked': {
      color: colors.purple,
    },
  },
  [`& .${classes.checked}`]: {},
})

const PurpleRadio = (props: RadioProps) => <Radio color="default" {...props} />

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
    <StyledStyledLabel>
      <StyledContainer style={containerStyle}>
        <PurpleRadio
          checked={value === currentAnswer}
          onChange={onClick}
          value={value}
          name="radio-button-mui"
          inputProps={{ 'aria-label': value }}
          classes={{
            root: classes.root,
            checked: classes.checked,
          }}
        />
        <div>{label}</div>
      </StyledContainer>
    </StyledStyledLabel>
  )
}
