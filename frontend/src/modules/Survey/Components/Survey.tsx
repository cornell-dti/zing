import React, { useState } from 'react'

import { StyledContainer1, StyledContainer2 } from 'Survey/Styles/Survey.style'
import { StepTemplate } from 'Survey/Components/StepTemplate'
import { Step0 } from 'Survey/Components/Step0'
import { Step1 } from 'Survey/Components/Step1'
import { Step2 } from 'Survey/Components/Step2'
import { Step3 } from 'Survey/Components/Step3'
import { StepFinal } from 'Survey/Components/StepFinal'

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
    <StyledContainer2>
      <StepTemplate
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <Step1 />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 2 ? (
    <StyledContainer2>
      <StepTemplate
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <Step2 />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 3 ? (
    <StyledContainer2>
      <StepTemplate
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <Step3 />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 4 ? (
    <StyledContainer2>
      <StepFinal />
    </StyledContainer2>
  ) : (
    <div></div>
  )
}
