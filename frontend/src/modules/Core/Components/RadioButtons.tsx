import React from 'react'

import { RadioButton } from '@core'
import { RadioButtonsProps } from '@core/Types'

import { StyledContainer } from '@core/Styles/RadioButtons.style'

export const RadioButtons = ({
  values,
  onClick,
  onClickLabel,
}: RadioButtonsProps) => {
  let radioButtonList: JSX.Element[] = []
  values.forEach((value, index) => {
    radioButtonList.push(
      <RadioButton
        onClick={onClick}
        onClickLabel={onClickLabel}
        value={value}
        name="Ethnicity"
      />
    )
  })
  return <StyledContainer>{radioButtonList}</StyledContainer>
}
