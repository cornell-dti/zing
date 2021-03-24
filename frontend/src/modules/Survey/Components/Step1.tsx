import React, { useState } from 'react'
import {
  StyledContainer,
  StyledTitleWrapper,
  StyledWelcomeText,
  StyledRadioButtonsWrapper,
  StyledRadioButtons,
} from 'Survey/Styles/Step1.style'

export const Step1 = () => {
  const [ethnicity, setEthnicity] = useState('buh')
  const ethnicityList: string[] = [
    'American Indian/Alaskan Native',
    'Asian',
    'Black or African American',
    'Hispanic/Latino',
    'Native Hawaiian/Other Pacific Islander',
    'White',
    'Other',
  ]
  return (
    <StyledContainer>
      <StyledTitleWrapper>
        <StyledWelcomeText>What do you identify as?</StyledWelcomeText>
      </StyledTitleWrapper>
      <StyledRadioButtonsWrapper>
        <StyledRadioButtons
          values={ethnicityList}
          onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEthnicity(e.target.value)
          }
        />
      </StyledRadioButtonsWrapper>
    </StyledContainer>
  )
}
