import React, { useState } from 'react'

import { StyledContainer1, StyledContainer2 } from 'Survey/Styles/Survey.style'
import { Step0 } from 'Survey/Components'

export const Survey = () => {
  const [currStep, setCurrStep] = useState(0)

  return currStep === 0 ? (
    <StyledContainer1>
      <Step0
        gotoPrevStep={() => {}}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      />
    </StyledContainer1>
  ) : currStep === 1 ? (
    <StyledContainer2></StyledContainer2>
  ) : (
    <div></div>
  )
}
