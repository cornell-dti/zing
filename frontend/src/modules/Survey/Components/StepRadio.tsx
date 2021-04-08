import React, { useState, FunctionComponent } from 'react'
import {
  StyledContainer,
  StyledTitleWrapper,
  StyledWelcomeText,
  StyledRadioButtonsWrapper,
  StyledRadioButtons,
} from 'Survey/Styles/StepRadio.style'
import { StepProps } from 'Survey/Types/StepProps'

export const StepRadio: FunctionComponent<StepProps> = ({
  currentAnswer,
  setAnswer,
  questionList,
  key,
}: StepProps) => {
  const [hasSelectedAns, setHasSelectedAns] = useState(false)
  function handleClick(arg: string) {
    console.warn(arg)
    setHasSelectedAns(true)
    setAnswer(arg)
  }
  return (
    <StyledContainer>
      <StyledTitleWrapper>
        <StyledWelcomeText>
          {questionList !== undefined ? questionList[0] : 'Error'}
        </StyledWelcomeText>
      </StyledTitleWrapper>
      <StyledRadioButtonsWrapper>
        <StyledRadioButtons
          currentAnswer={currentAnswer}
          values={questionList}
          onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleClick(e.target.value)
          }
          key={key}
        />
      </StyledRadioButtonsWrapper>
    </StyledContainer>
  )
}
