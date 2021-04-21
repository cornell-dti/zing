import React, { useState, FunctionComponent } from 'react'
import { NameField, NumberField, colors } from '@core'
import styled, { css } from 'styled-components'
import { QuestionProps } from '../Types/QuestionType'

export const Question = ({
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
      <NumberField
        inputStyle={textInputStyle}
        placeholder={'0'}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAnswer(e.target.value)
        }
      />
    )
  else {
    return (
      <NameField
        inputStyle={textInputStyle}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAnswer(e.target.value)
        }
      />
    )
  }
}
