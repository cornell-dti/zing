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

export const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState('')
  const [totalPeople, setTotalPeople] = useState('')
  const [studentsPerGroup, setStudentsPerGroup] = useState('')
  const placeholder = 'Type your answer here...'
  const q1 = 'Name your group:'
  const q2 = 'Total number of people:'
  const q3 = 'People per group:'
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
            <StyledQuestionWrapper>
              <StyledQuestion
                fullWidth={true}
                question={q1}
                value={groupName}
                setAnswer={(arg: string) => setGroupName(arg)}
                placeholder={placeholder}
                isNumber={false}
              />
            </StyledQuestionWrapper>
            <StyledQuestionWrapper>
              <StyledQuestion
                fullWidth={false}
                question={q2}
                value={totalPeople}
                setAnswer={(arg: string) => setTotalPeople(arg)}
                placeholder={placeholder}
                isNumber={true}
              />
            </StyledQuestionWrapper>
            <StyledQuestionWrapper>
              <StyledQuestion
                fullWidth={false}
                question={q3}
                value={studentsPerGroup}
                setAnswer={(arg: string) => setStudentsPerGroup(arg)}
                placeholder={placeholder}
                isNumber={true}
              />
            </StyledQuestionWrapper>
            <SubmitButton onClick={() => console.log('breh')} />
          </StyledQuestionsWrapper>
          {/* <p>{groupName}</p>
          <p>{totalPeople}</p>
          <p>{studentsPerGroup}</p> */}
        </StyledFullPanel>
      </StyledContainer>
    </StyledOuterContainer>
  )
}
