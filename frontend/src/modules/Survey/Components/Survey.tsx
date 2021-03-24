import React, { useState } from 'react'

import { StyledContainer } from 'Survey/Styles/Survey.style'
import { Step0 } from 'Survey/Components/Step0'
import { Step4 } from 'Survey/Components/Step4'

export const Survey = () => {
  const [currStep, setCurrStep] = useState(0)

  return (
    <StyledContainer>
      {currStep === 0 ? (
        <Step4
          gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
          gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
        />
      ) : currStep === 4 ? (
        <Step4
          gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
          gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
        />
      ) : (
        <></>
      )}
    </StyledContainer>
  )
}
