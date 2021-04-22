import React, { FunctionComponent, useState } from 'react'
import {
  StyledContainer,
  StyledFullPanel,
  StyledWrapper,
  StyledLogoWrapper,
  StyledLogo,
  StyledQuestionWrapper,
  StyledOuterContainer,
  StyledText,
  StyledTextWrapper,
  StyledQuestion,
  StyledQuestionsWrapper,
} from '../Styles/FormStyle.style'
import { SubmitButton } from '../Components/SubmitButton'
import { group } from 'node:console'

export const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState('')
  const [totalPeople, setTotalPeople] = useState('')
  const [studentsPerGroup, setStudentsPerGroup] = useState('')
  const [q1Error, setQ1Error] = useState('')
  const [q2Error, setQ2Error] = useState('')
  const [q3Error, setQ3Error] = useState('')
  const placeholder = 'Type your answer here...'
  const q1 = 'Name your group:'
  const q2 = 'Total number of people:'
  const q3 = 'People per group:'
  function handleSubmit() {
    /* need to store errors locally since useStates get updated too slow 
    (after function finishes) */
    var error1: boolean
    var error2: boolean
    var error3: boolean
    // name validation
    if (groupName === '') {
      setQ1Error('Please enter a name')
      error1 = true
    } else {
      setQ1Error('')
      error1 = false
    }

    // total people validation
    if (Number(totalPeople) <= 0 || totalPeople === '') {
      setQ2Error('Please enter a valid number')
      error2 = true
    } else if (Number(totalPeople) < Number(studentsPerGroup)) {
      setQ2Error('Total people cannot be less than people per group')
      error2 = true
    } else {
      setQ2Error('')
      error2 = false
    }

    // students per group validation
    if (Number(studentsPerGroup) <= 0 || studentsPerGroup === '') {
      setQ3Error('Please enter a valid number')
      error3 = true
    } else if (Number(totalPeople) < Number(studentsPerGroup)) {
      setQ3Error('Total people cannot be less than people per group')
      error3 = true
    } else {
      setQ3Error('')
      error3 = false
    }
    // now check if there are any outstanding errors
    if (!error1 && !error2 && !error3) {
      // if not go to dashboard and there will be notif waiting for them
      alert('now you proceed back to dashboard (not implemented yet')
    } else {
      // else stay here and show errors
      console.warn('some kind of error')
    }
  }
  return (
    <StyledOuterContainer>
      <StyledContainer>
        <StyledFullPanel>
          <StyledLogoWrapper>
            <StyledLogo />
          </StyledLogoWrapper>
          <StyledTextWrapper>
            <StyledText>Let's get this party started!</StyledText>
          </StyledTextWrapper>
          <StyledQuestionsWrapper>
            <StyledQuestionWrapper
              style={{ paddingBottom: q1Error === '' ? '1.4rem' : '0rem' }}
            >
              <StyledQuestion
                error={q1Error === '' ? '' : q1Error}
                fullWidth={true}
                question={q1}
                value={groupName}
                setAnswer={(arg: string) => setGroupName(arg)}
                placeholder={placeholder}
                isNumber={false}
              />
            </StyledQuestionWrapper>
            <StyledQuestionWrapper
              style={{ paddingBottom: q2Error === '' ? '1.4rem' : '0rem' }}
            >
              <StyledQuestion
                fullWidth={true}
                error={q2Error === '' ? '' : q2Error}
                question={q2}
                value={totalPeople}
                setAnswer={(arg: string) => setTotalPeople(arg)}
                placeholder={placeholder}
                isNumber={true}
              />
            </StyledQuestionWrapper>
            <StyledQuestionWrapper
              style={{ paddingBottom: q3Error === '' ? '1.4rem' : '0rem' }}
            >
              <StyledQuestion
                fullWidth={true}
                error={q3Error === '' ? '' : q3Error}
                question={q3}
                value={studentsPerGroup}
                setAnswer={(arg: string) => setStudentsPerGroup(arg)}
                placeholder={placeholder}
                isNumber={true}
              />
            </StyledQuestionWrapper>
            <SubmitButton onClick={handleSubmit} />
          </StyledQuestionsWrapper>
          {/* <p>{groupName}</p>
          <p>{totalPeople}</p>
          <p>{studentsPerGroup}</p> */}
        </StyledFullPanel>
      </StyledContainer>
    </StyledOuterContainer>
  )
}
