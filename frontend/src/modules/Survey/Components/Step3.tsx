import React from 'react'
import { colors } from '@core'
import {
  StyledContainer,
  StyledText,
  StyledCalendarWrapper,
  StyledTextField,
  StyledErrorWrapper,
  StyledErrorIcon,
  StyledErrorText,
} from 'Survey/Styles/Step3.style'
import { StepProps } from 'Survey/Types/StepProps'
import {
  getYoungestGradYear,
  getOldestGradYear,
} from 'Survey/Components/FuncsAndConsts/SurveyFunctions'

export const Step3 = ({ showError, setAnswer, currentAnswer }: StepProps) => {
  const textContainerStyle = {
    margin: '0.75rem 0',
    root: {
      background: colors.white,
      borderRadius: 3,
      border: 0,
      height: 48,
      padding: '0 30px',
      '& .MuiInput-underline:before': {
        borderBottomColor: colors.lightviolet, // Semi-transparent underline
      },
      '& .MuiInput-underline:hover:before': {
        borderBottomColor: colors.lightviolet, // Solid underline on hover
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: colors.lightviolet, // Solid underline on focus
      },
      '& .MuiInputBase-root': {
        color: colors.lightviolet,
      },
      '& .MuiInputBase-root:focus': {
        color: colors.lightviolet,
      },
    },
  }

  const textInputStyle = {
    fontWeight: '800',
    color: colors.lightviolet,
  }

  return (
    <StyledContainer>
      <StyledText>When are you graduating?</StyledText>
      <StyledCalendarWrapper>
        {showError ? (
          <StyledErrorWrapper>
            <StyledErrorIcon />
            <StyledErrorText>
              Please enter a year between {String(getOldestGradYear())} and
              {' ' + String(getYoungestGradYear())}
            </StyledErrorText>
          </StyledErrorWrapper>
        ) : null}
        <StyledTextField
          containerStyle={textContainerStyle}
          inputStyle={textInputStyle}
          value={currentAnswer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnswer(e.target.value)
          }
        />
      </StyledCalendarWrapper>
    </StyledContainer>
  )
}
