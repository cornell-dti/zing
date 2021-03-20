import React, { useState } from 'react'
import { StepProps } from 'Survey/Types'

import {
  StyledContainer,
  StyledLogo,
  StyledCongratulationsWrapper,
  StyledLogoWrapper,
  StyledCongratulationsText,
  StyledFullPanel,
  StyledCheck,
  StyledContactText,
  StyledContactWrapper,
} from 'Survey/Styles/Step2.style'

export const Step2 = () => {
  return (
    <StyledContainer>
      <StyledFullPanel>
        <StyledLogoWrapper>
          <StyledLogo />
          <StyledCongratulationsWrapper>
            <StyledCheck />
            <StyledCongratulationsText>
              Congratulations on completing the form! You should receive an
              email with your team members shortly.
            </StyledCongratulationsText>
          </StyledCongratulationsWrapper>
        </StyledLogoWrapper>
        <StyledContactWrapper>
          <StyledContactText>
            Contact ***@cornell.edu with any questions.
          </StyledContactText>
        </StyledContactWrapper>
      </StyledFullPanel>
    </StyledContainer>
  )
}
