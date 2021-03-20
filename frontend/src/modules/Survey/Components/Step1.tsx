import React, { useState } from 'react'
import { StepProps } from 'Survey/Types'
import {
  StyledContainer,
  StyledProgressBar,
  StyledLogo,
  StyledTitleWrapper,
  StyledWelcomeText,
  StyledFullPanel,
} from 'Survey/Styles/Step1.style'

export const Step1 = ({ gotoPrevStep, gotoNextStep }: StepProps) => {
  return (
    <StyledContainer>
      <StyledFullPanel>
        <StyledProgressBar />
        <StyledLogo />
        <StyledTitleWrapper>
          <StyledWelcomeText>What do you identify as?</StyledWelcomeText>
        </StyledTitleWrapper>
      </StyledFullPanel>
    </StyledContainer>
  )
}
