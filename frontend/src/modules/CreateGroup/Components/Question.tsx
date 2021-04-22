import React, { useState, FunctionComponent } from 'react'
import { NameField, NumberField, colors } from '@core'
import styled, { css } from 'styled-components'
import { QuestionProps } from '../Types/QuestionType'
import {
  StyledQuestionContainer,
  StyledText,
} from '../Styles/QuestionStyle.style'

export const Question = ({
  fullWidth,
  question,
  setAnswer,
  value,
  placeholder,
  isNumber,
}: QuestionProps) => {
  const textInputStyle = {
    fontWeight: '500',
    color: colors.darkpurple,
  }
  if (isNumber)
    return (
      <StyledQuestionContainer>
        <StyledText>{question}</StyledText>
        <NumberField
          containerStyle={{ width: '15%' }}
          inputStyle={textInputStyle}
          placeholder={'0'}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnswer(e.target.value)
          }
        />
      </StyledQuestionContainer>
    )
  else {
    return (
      <StyledQuestionContainer>
        <StyledText>{question}</StyledText>
        <NameField
          fullWidth={fullWidth}
          inputStyle={textInputStyle}
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnswer(e.target.value)
          }
        />
      </StyledQuestionContainer>
    )
  }
}
