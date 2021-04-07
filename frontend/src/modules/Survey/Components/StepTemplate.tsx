import React, { FunctionComponent } from 'react'
import { StepTemplateProps } from 'Survey/Types'
import {
  StyledContainer,
  StyledWrapper,
  StyledLogo,
  StyledFullPanel,
  StyledPrevButton,
  StyledNextButton,
  StyledFullPanelNoPadding,
} from 'Survey/Styles/StepTemplate.style'
import prev from '@assets/img/prev.svg'
import next from '@assets/img/next.svg'
import ProgressBar from './UIElements/ProgressBar'

export const StepTemplate: FunctionComponent<StepTemplateProps> = ({
  stepNumber,
  totalSteps,
  gotoPrevStep,
  gotoNextStep,
  children,
}) => {
  return (
    <StyledContainer>
      <StyledFullPanelNoPadding>
        <ProgressBar stepNumber={stepNumber} totalSteps={totalSteps} />
        <StyledFullPanel>
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
      </StyledFullPanelNoPadding>
    </StyledContainer>
  )
}
