import React, { useState } from 'react'

import { StyledContainer1, StyledContainer2 } from 'Survey/Styles/Survey.style'
import { StepTemplate } from 'Survey/Components/StepTemplate'
import { Step0 } from 'Survey/Components/Step0'
import { Step3 } from 'Survey/Components/Step3'
import { StepRadio } from 'Survey/Components/StepRadio'
import { StepFinal } from 'Survey/Components/StepFinal'
import {
  getLetter,
  sendSurveyData,
  surveyData,
} from 'Survey/Components/FuncsAndConsts/SurveyFunctions'
import { group } from 'node:console'

export const Survey = () => {
  const [currStep, setCurrStep] = useState(0)
  const questions = require('./FuncsAndConsts/Questions.json')

  // state props
  // step 1
  const [ethnicityAnswer, setEthnicityAnswer] = useState('')

  // step 2
  const [pronounAnswer, setPronounAnswer] = useState('')

  // step 3
  const [gradAnswer, setGradAnswer] = useState('')

  // step 4
  const [collegeAnswer, setCollegeAnswer] = useState('')

  // step 5
  const [locationAnswer, setLocationAnswer] = useState('')

  // step 6
  const [groupPrefAnswer, setGroupPrefAnswer] = useState('')

  // step 7
  const [studyTimeAnswer, setStudyTimeAnswer] = useState('')

  // step 8
  const [assignmentAnswer, setAssignmentAnswer] = useState('')

  // last step's Next button handles sending data
  function finalNext() {
    const surveyDataObj: surveyData = {
      courseId: 'zf101-2021sp', // hard coded
      fullName: 'Zing Person', // hard coded
      studentId: 'a1',
      identity: getLetter(ethnicityAnswer, false),
      pronoun: getLetter(pronounAnswer, false),
      graduation: getLetter(gradAnswer, true),
      college: getLetter(collegeAnswer, false),
      remote: getLetter(locationAnswer, false),
      mode: getLetter(groupPrefAnswer, false),
      time: getLetter(studyTimeAnswer, false),
      start: getLetter(assignmentAnswer, false),
    }
    sendSurveyData(surveyDataObj)
    setCurrStep(currStep + 1)
  }

  return currStep === 0 ? (
    <StyledContainer1>
      <Step0
        currentAnswer={'foo'} // TODO: make name and email later or smth else
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => {}}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      />
    </StyledContainer1>
  ) : currStep === 1 ? (
    <StyledContainer2>
      <StepTemplate
        currentAnswer={ethnicityAnswer}
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          questionList={questions.step1}
          setAnswer={setEthnicityAnswer}
          key={String(currStep)}
          currentAnswer={ethnicityAnswer}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 2 ? (
    <StyledContainer2>
      <StepTemplate
        currentAnswer={pronounAnswer}
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          currentAnswer={pronounAnswer}
          questionList={questions.step2}
          setAnswer={setPronounAnswer}
          key={String(currStep)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 3 ? (
    <StyledContainer2>
      <StepTemplate
        currentAnswer={gradAnswer}
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <Step3 currentAnswer={gradAnswer} setAnswer={setGradAnswer} />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 4 ? (
    <StyledContainer2>
      <StepTemplate
        currentAnswer={collegeAnswer}
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          currentAnswer={collegeAnswer}
          questionList={questions.step4}
          setAnswer={setCollegeAnswer}
          key={String(currStep)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 5 ? (
    <StyledContainer2>
      <StepTemplate
        currentAnswer={locationAnswer}
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          currentAnswer={locationAnswer}
          questionList={questions.step5}
          setAnswer={(ans: string) => setLocationAnswer(ans)}
          key={String(currStep)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 6 ? (
    <StyledContainer2>
      <StepTemplate
        currentAnswer={groupPrefAnswer}
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          currentAnswer={groupPrefAnswer}
          questionList={questions.step6}
          setAnswer={(ans: string) => setGroupPrefAnswer(ans)}
          key={String(currStep)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 7 ? (
    <StyledContainer2>
      <StepTemplate
        currentAnswer={studyTimeAnswer}
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      >
        <StepRadio
          currentAnswer={studyTimeAnswer}
          questionList={questions.step7}
          setAnswer={(ans: string) => setStudyTimeAnswer(ans)}
          key={String(currStep)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 8 ? (
    <StyledContainer2>
      <StepTemplate
        currentAnswer={studyTimeAnswer}
        stepNumber={currStep}
        totalSteps={8}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={finalNext}
      >
        <StepRadio
          currentAnswer={assignmentAnswer}
          questionList={questions.step8}
          setAnswer={(ans: string) => setAssignmentAnswer(ans)}
          key={String(currStep)}
        />
      </StepTemplate>
    </StyledContainer2>
  ) : currStep === 9 ? (
    <StyledContainer2>
      <StepFinal />
      <p>{getLetter(ethnicityAnswer, false)}</p>
      <p>{getLetter(pronounAnswer, false)}</p>
      <p>{getLetter(gradAnswer, true)}</p>
      <p>{getLetter(collegeAnswer, false)}</p>
      <p>{getLetter(locationAnswer, false)}</p>
      <p>{getLetter(groupPrefAnswer, false)}</p>
      <p>{getLetter(studyTimeAnswer, false)}</p>
      <p>{getLetter(assignmentAnswer, false)}</p>
    </StyledContainer2>
  ) : null
}
