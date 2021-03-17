import React, { useState } from 'react'

import { StyledContainer } from 'Survey/Styles/Survey.style'
import { Step0 } from 'Survey/Components'

export const Survey = () => {
  const [currStep, setCurrStep] = useState(0)

  return (
    <StyledContainer>
      {currStep === 0 ? (
        <Step0
          gotoPrevStep={() => {}}
          gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
        />
      ) : currStep === 1 ? (
        <div></div>
      ) : (
        <div></div>
      )}
    </StyledContainer>
  )
}
