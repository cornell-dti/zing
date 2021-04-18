import React, { FunctionComponent, useState } from 'react'
import {
  StyledContainer,
  StyledFullPanel,
  StyledWrapper,
  StyledLogoWrapper,
  StyledLogo,
  StyledHeaderWrapper,
  StyledOuterContainer,
  StyledText,
  StyledTextWrapper,
  StyledQuestion,
  StyledQuestionsWrapper,
} from '../Styles/FormStyle.style'
import { Question } from 'CreateGroup/Components/Question'

export const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState('')
  const [totalPeople, setGroupMemberCount] = useState('')
  const [peoplePerGroup, setPeoplePerGroup] = useState('')
  const placeholder = 'Type your answer here...'
  return (
    <StyledOuterContainer>
      <StyledContainer>
        <StyledFullPanel>
          <StyledLogoWrapper>
            <StyledLogo />
          </StyledLogoWrapper>
          <StyledTextWrapper>
            <StyledText>
              Fill out this form to get the party started!
            </StyledText>
          </StyledTextWrapper>
          <StyledQuestionsWrapper>
            <StyledQuestion
              value={groupName}
              setAnswer={(arg: string) => setGroupName(arg)}
              placeholder={placeholder}
              isNumber={false}
            />
          </StyledQuestionsWrapper>
        </StyledFullPanel>
      </StyledContainer>
    </StyledOuterContainer>
  )
}
