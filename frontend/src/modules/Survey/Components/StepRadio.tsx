import React from 'react'
import {
  StyledContainer,
  StyledQuestionText,
  StyledRadioButtonsWrapper,
  StyledErrorWrapper,
  StyledErrorIcon,
  StyledErrorText,
} from 'Survey/Styles/StepRadio.style'
import { RadioButton } from '@core'
import { StepProps } from 'Survey/Types/StepProps'
import { Option } from '@core/Types'

export const StepRadio = ({
  showError,
  currentAnswer,
  setAnswer,
  question,
}: StepProps) => {
  return (
    <StyledContainer>
      <StyledQuestionText>{question.description}</StyledQuestionText>
      <StyledRadioButtonsWrapper>
        {showError ? (
          <StyledErrorWrapper>
            <StyledErrorIcon />
            <StyledErrorText>Please select an item to continue</StyledErrorText>
          </StyledErrorWrapper>
        ) : null}
        <StyledContainer>
          {Object.entries(question.options).map(([value, option]) => (
            <RadioButton
              currentAnswer={currentAnswer}
              onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer(e.target.value)
              }
              value={option.hash}
              label={option.description}
              name="RadioButtons"
              key={option.hash}
            />
          ))}
        </StyledContainer>
      </StyledRadioButtonsWrapper>
    </StyledContainer>
  )
}
