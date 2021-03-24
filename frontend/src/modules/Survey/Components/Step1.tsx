import React, { useState } from 'react'
import { StepProps } from 'Survey/Types'
import {
  StyledContainer,
  StyledProgressBar,
  StyledLogo,
  StyledTitleWrapper,
  StyledWelcomeText,
  StyledFullPanel,
  StyledPrevButton,
  StyledNextButton,
  StyledRadioButtonsWrapper,
  StyledRadioButtons,
} from 'Survey/Styles/Step1.style'
import prev from '@assets/img/prev.svg'
import next from '@assets/img/next.svg'

export const Step1 = ({ gotoPrevStep, gotoNextStep }: StepProps) => {
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
      <StyledFullPanel>
        {/* <StyledProgressBar /> */}
        <StyledLogo />
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
        <StyledPrevButton className="prev" src={prev} onClick={gotoPrevStep} />
        <StyledNextButton className="next" src={next} onClick={gotoNextStep} />
      </StyledFullPanel>
    </StyledContainer>
  )
}
