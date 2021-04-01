import React, { useState } from 'react'

import { StyledContainer1, StyledContainer2 } from 'Survey/Styles/Survey.style'
import { StepTemplate } from 'Survey/Components/StepTemplate'
import { Step0 } from 'Survey/Components/Step0'
import { Step2 } from 'Survey/Components/Step2'
import { Step3 } from 'Survey/Components/Step3'
import { StepRadio } from 'Survey/Components/StepRadio'
import { StepFinal } from 'Survey/Components/StepFinal'

export const Survey = () => {
  const [currStep, setCurrStep] = useState(0)

  const ethnicityQuestion = 'What do you identify as?'
  const [ethnicityAnswer, setEthnicityAnswer] = useState('no ethnicity ans')
  const ethnicityList: string[] = [
    'American Indian/Alaskan Native',
    'Asian',
    'Black or African American',
    'Hispanic/Latino',
    'Native Hawaiian/Other Pacific Islander',
    'White',
    'Other',
  ]

  const locationQuestion = 'Are you studying remotely this semester?'
  const [locationAnswer, setLocationAnswer] = useState('no loc ans')
  const locationList: string[] = [
    "No, I'm on campus",
    'Yes, I’m outside of Ithaca, but still in the US',
    'Yes, I’m in a country outside the US',
  ]

  const groupPrefQuestion = 'How do you prefer studying with groups this year?'
  const [groupPrefAnswer, setGroupPrefAnswer] = useState('no grppref ans')
  const groupPrefList: string[] = ['Online', 'In-person', 'Both']

  const studyTimeQuestion = 'When do you prefer studying for this course?'
  const [studyTimeAnswer, setStudyTimeAnswer] = useState('no studytime ans')
  const studyTimeList: string[] = [
    'Morning (8am-12pm)',
    'Early Afternoon (12pm-4pm)',
    'Late Afternoon (4pm-8pm)',
    'Evening (8pm-12am)',
    'Late (12am-4am)',
  ]

  const assignmentQuestion = 'You have an assignment. When do you start it?'
  const [assignmentAnswer, setAssignmentAnswer] = useState('no assignment ans')
  const assignmentList: string[] = [
    'Immediately, the day you get it',
    'Early, but not immediately',
    'Midway',
    'Late, the day before',
    'I don’t / I submit late.',
  ]

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
        <StepRadio
          question={ethnicityQuestion}
          questionList={ethnicityList}
          setAnswer={setEthnicityAnswer}
        />
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
  ) : currStep === 7 ? (
    <StyledContainer2>
      <StepTemplate
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          question={locationQuestion}
          questionList={locationList}
          setAnswer={(ans: string) => setLocationAnswer(ans)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 8 ? (
    <StyledContainer2>
      <StepTemplate
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          question={groupPrefQuestion}
          questionList={groupPrefList}
          setAnswer={(ans: string) => setGroupPrefAnswer(ans)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 9 ? (
    <StyledContainer2>
      <StepTemplate
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          question={studyTimeQuestion}
          questionList={studyTimeList}
          setAnswer={(ans: string) => setStudyTimeAnswer(ans)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 10 ? (
    <StyledContainer2>
      <StepTemplate
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          question={assignmentQuestion}
          questionList={assignmentList}
          setAnswer={(ans: string) => setAssignmentAnswer(ans)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 11 ? (
    <StyledContainer2>
      <StepFinal />
    </StyledContainer2>
  ) : (
    <StyledContainer2>
      <StepTemplate
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      />
    </StyledContainer2>
  )
}
