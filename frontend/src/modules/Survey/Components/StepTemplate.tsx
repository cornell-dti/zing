import React, { FunctionComponent, useState } from 'react'
import { StepTemplateProps } from 'Survey/Types'
import {
  StyledContainer,
  StyledWrapper,
  StyledLogo,
  StyledFullPanel,
  StyledPrevButton,
  StyledNextButton,
  StyledFullPanelNoPadding,
  StyledHeaderWrapper,
  StyledLogoWrapper,
  StyledErrorWrapper,
  StyledErrorText,
} from 'Survey/Styles/StepTemplate.style'
import prev from '@assets/img/prev.svg'
import next from '@assets/img/next.svg'
import ProgressBar from './UIElements/ProgressBar'

export const StepTemplate: FunctionComponent<StepTemplateProps> = ({
  currentAnswer,
  stepNumber,
  totalSteps,
  gotoPrevStep,
  gotoNextStep,
  children,
}) => {
  // TODO: incorporate currentAnswer
  const [showError, setShowError] = useState(false)
  function handleNext() {
    console.log('this is current answer: ' + currentAnswer)
    if (currentAnswer !== '') {
      gotoNextStep()
      setShowError(false)
    } else {
      setShowError(true)
    }
  }
  return (
    <StyledContainer>
      <StyledFullPanelNoPadding>
        <ProgressBar stepNumber={stepNumber} totalSteps={totalSteps} />
        <StyledFullPanel>
          <StyledHeaderWrapper>
            <StyledLogoWrapper style={{ height: '10%' }}>
              <StyledLogo />
            </StyledLogoWrapper>
            {showError ? (
              <StyledErrorWrapper>
                <StyledErrorText>
                  Please respond to the following question
                </StyledErrorText>
              </StyledErrorWrapper>
            ) : null}
          </StyledHeaderWrapper>
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
              onClick={handleNext}
            />
          </StyledWrapper>
        </StyledFullPanel>
      </StyledFullPanelNoPadding>
    </StyledContainer>
  )
}
