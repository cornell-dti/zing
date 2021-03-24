import React, { FunctionComponent } from 'react'
import { StepProps } from 'Survey/Types'
import {
  StyledContainer,
  StyledWrapper,
  StyledLogo,
  StyledFullPanel,
  StyledPrevButton,
  StyledNextButton,
} from 'Survey/Styles/StepTemplate.style'
import prev from '@assets/img/prev.svg'
import next from '@assets/img/next.svg'

export const StepTemplate: FunctionComponent<StepProps> = ({
  gotoPrevStep,
  gotoNextStep,
  children,
}) => {
  return (
    <StyledContainer>
      <StyledFullPanel>
        {/* <StyledProgressBar /> */}
        <StyledWrapper style={{ height: '10%' }}>
          <StyledLogo />
        </StyledWrapper>
        <StyledWrapper style={{ height: '80%' }}>{children}</StyledWrapper>
        <StyledWrapper style={{ height: '10%' }}>
          <StyledPrevButton
            className="prev"
            src={prev}
            onClick={gotoPrevStep}
          />
          <StyledNextButton
            className="next"
            src={next}
            onClick={gotoNextStep}
          />
        </StyledWrapper>
      </StyledFullPanel>
    </StyledContainer>
  )
}
