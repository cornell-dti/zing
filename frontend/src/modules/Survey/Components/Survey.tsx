import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import axios from 'axios'

import { StyledContainer1, StyledContainer2 } from 'Survey/Styles/Survey.style'
import { StepTemplate } from 'Survey/Components/StepTemplate'
import { StepBegin } from 'Survey/Components/StepBegin'
import { StepRadio } from 'Survey/Components/StepRadio'
import { StepFinal } from 'Survey/Components/StepFinal'
import { SurveyForm } from '@core/Types'
import { useEffect } from 'react'
import { API_ROOT, COURSE_API, HOME_PATH, SURVEY_API } from '@core/Constants'

export const Survey = () => {
  const { search } = useLocation()
  const history = useHistory()

  const query = new URLSearchParams(search)
  const surveyId = query.get('id')

  useEffect(() => {
    if (!surveyId) history.push(HOME_PATH)
  }, [surveyId, history])

  const [showError, setShowError] = useState(false)
  const [currStep, setCurrStep] = useState(0)
  // If there are custom questions the below will be a network call perhaps
  // ^ here it is baby:
  useEffect(() => {
    const fetcher = async () => {
      axios.get(`${API_ROOT}${COURSE_API}/${surveyId}${SURVEY_API}`).then(
        (response: any) => {
          setQuestions(response.data)
        },
        (error: any) => {
          console.log(error)
        }
      )
    }
    fetcher().then(() => console.log('fetcher called'))
  }, [surveyId])
  const defaultSurvey: SurveyForm = require('@core/Questions/DefaultSurvey.json')
  const [questions, setQuestions] = useState<SurveyForm>(defaultSurvey)
  // const numSpecialQuestions = 0 // don't think we need this anymore due to the api call
  const totalSteps = questions.questions.length

  // Form answer props
  const [nameAnswer, setNameAnswer] = useState('')
  const [emailAnswer, setEmailAnswer] = useState('')
  const [answers, setAnswers] = useState(
    Array<string>(questions.questions.length).fill('')
  ) // Will be in order of Qs

  const changeAnswer = (i: number, v: string) => {
    setAnswers(answers.map((value, index) => (index === i ? v : value)))
  }

  // last step's Next button handles sending data
  function finalNext() {
    const mcData = Object.fromEntries(
      questions.questions.map((question, index) => [
        question.hash,
        answers[index],
      ])
    )
    const surveyData: SurveyData = {
      fullName: nameAnswer,
      email: emailAnswer, // this could need to be changed back to studentId, but pending woosangs changes it should be email
      surveyResponse: mcData,
    }
    axios
      .post(`${API_ROOT}${COURSE_API}/${surveyId}${SURVEY_API}`, surveyData)
      .then(
        (response: any) => {
          console.log(response)
        },
        (error: any) => {
          console.log(error)
        }
      )
    setCurrStep(currStep + 1)
  }

  const multipleChoiceIndex = currStep - 1
  const isStepValid = answers[multipleChoiceIndex] !== ''

  return currStep === 0 ? ( // Form landing
    <StyledContainer1>
      <StepBegin
        name={nameAnswer}
        email={emailAnswer}
        setName={(arg: string) => setNameAnswer(arg)}
        setEmail={(arg: string) => setEmailAnswer(arg)}
        dueDate={questions.dueDate}
        gotoNextStep={() => setCurrStep((currStep) => currStep + 1)}
      />
    </StyledContainer1>
  ) : currStep === totalSteps + 1 ? ( // Form confirmation
    <StyledContainer2>
      <StepFinal />
    </StyledContainer2>
  ) : (
    <StyledContainer2>
      <StepTemplate
        setShowError={setShowError}
        isStepValid={isStepValid}
        stepNumber={currStep}
        totalSteps={totalSteps}
        gotoPrevStep={() => setCurrStep((currStep) => currStep - 1)}
        gotoNextStep={
          currStep === totalSteps
            ? finalNext
            : () => setCurrStep((currStep) => currStep + 1)
        }
      >
        <StepRadio
          showError={showError}
          currentAnswer={answers[multipleChoiceIndex]}
          question={questions.questions[multipleChoiceIndex]}
          setAnswer={(arg) => changeAnswer(multipleChoiceIndex, arg)}
          key={String(currStep)}
        />
      </StepTemplate>
    </StyledContainer2>
  )
}

interface SurveyData {
  fullName: string
  email: string
  surveyResponse: { [key: string]: string }
}
