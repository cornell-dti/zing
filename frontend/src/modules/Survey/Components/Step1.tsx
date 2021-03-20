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
} from 'Survey/Styles/Step1.style'
import prev from '@assets/img/prev.svg'
import next from '@assets/img/next.svg'

export const Step1 = ({ gotoPrevStep, gotoNextStep }: StepProps) => {
  return (
    <StyledContainer>
      <StyledFullPanel>
        <StyledProgressBar />
        <StyledLogo />
        <StyledTitleWrapper>
          <StyledWelcomeText>What do you identify as?</StyledWelcomeText>
        </StyledTitleWrapper>
        <StyledPrevButton className="prev" src={prev} onClick={gotoPrevStep} />
        <StyledNextButton className="next" src={next} onClick={gotoNextStep} />
      </StyledFullPanel>
    </StyledContainer>
  )
}
