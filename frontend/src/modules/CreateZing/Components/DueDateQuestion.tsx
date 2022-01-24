import React from 'react'
import { styled } from '@mui/material/styles'
import { QuestionProps } from '../Types/QuestionType'
import {
  StyledQuestionContainer,
  StyledText,
} from '../Styles/QuestionStyle.style'
import {
  StyledCalendarWrapper,
  StyledTextFieldError,
  StyledTextField,
} from '../Styles/FormStyle.style'

const PREFIX = 'DueDateQuestion'

const classes = {
  container: `${PREFIX}-container`,
}

const StyledStyledQuestionContainer = styled(StyledQuestionContainer)`
  & .${classes.container} {
    display: flex;
    flex-wrap: wrap;
  }
`

export const DueDateQuestion = ({
  error,
  question,
  setAnswer,
  value,
  placeholder,
}: QuestionProps) => {
  const fieldWidth = '250px'

  return (
    <StyledStyledQuestionContainer>
      <StyledText>{question}</StyledText>
      <StyledCalendarWrapper>
        {error === '' ? (
          <form className={classes.container} noValidate>
            <StyledTextField
              id="date"
              type="date"
              defaultValue={value}
              sx={{
                width: fieldWidth,
                fontFamily: 'Montserrat',
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer(e.target.value)
              }
            />
          </form>
        ) : (
          <StyledTextFieldError
            error
            id="date"
            type="date"
            defaultValue={value}
            sx={{
              width: fieldWidth,
              fontFamily: 'Montserrat',
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAnswer(e.target.value)
            }
            helperText={error}
          />
        )}
      </StyledCalendarWrapper>
    </StyledStyledQuestionContainer>
  )
}
