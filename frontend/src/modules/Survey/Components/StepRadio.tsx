import React, { useState, FunctionComponent } from 'react'
import {
  StyledContainer,
  StyledTitleWrapper,
  StyledWelcomeText,
  StyledRadioButtonsWrapper,
  StyledRadioButtons,
} from 'Survey/Styles/Step1.style'
import { StepProps } from 'Survey/Types/StepProps'

export const StepRadio: FunctionComponent<StepProps> = ({
  setAnswer,
  questionList,
  question,
}: StepProps) => {
  function handleClick(arg: string) {
    console.warn(arg)
    setAnswer(arg)
  }
  return (
    <StyledContainer>
      <StyledTitleWrapper>
        <StyledWelcomeText>{question}</StyledWelcomeText>
      </StyledTitleWrapper>
      <StyledRadioButtonsWrapper>
        <StyledRadioButtons
          values={questionList}
          onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleClick(e.target.value)
          }
        />
      </StyledRadioButtonsWrapper>
    </StyledContainer>
  )
}
