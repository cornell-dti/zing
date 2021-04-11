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
  setShowError,
}) => {
  const years = require('./FuncsAndConsts/YearInfo.json')
  const youngestYear = Number(years.youngestYear)
  const oldestYear = Number(years.oldestYear)
  const [isShowingError, setisShowingError] = useState(false)

  // form validation
  function handleNext() {
    if (currentAnswer === '') {
      if (!isShowingError) {
        setShowError()
        setisShowingError(true)
      }
      return
    }
    if (stepNumber === 3) {
      const inputtedYear = Number(currentAnswer.substring(0, 4))
      if (inputtedYear - youngestYear >= 1 || inputtedYear - oldestYear <= -1) {
        if (!isShowingError) {
          setShowError()
          setisShowingError(true)
        }
        return
      }
    }
    if (isShowingError) {
      setShowError()
      setisShowingError(false)
    }
    gotoNextStep()
  }
  return (
    <StyledContainer>
      <StyledFullPanelNoPadding>
        <ProgressBar stepNumber={stepNumber} totalSteps={totalSteps} />
        <StyledFullPanel>
          <StyledHeaderWrapper>
            {/* <p>{String(isShowingError)}</p> */}
            <StyledLogoWrapper style={{ height: '8%' }}>
              <StyledLogo />
            </StyledLogoWrapper>
          </StyledHeaderWrapper>
          <StyledWrapper style={{ height: '82%' }}>{children}</StyledWrapper>
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
