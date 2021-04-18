import React, { useState, FunctionComponent } from 'react'
import { NameField, NumberField } from '@core'
import styled, { css } from 'styled-components'
import { QuestionProps } from '../Types/QuestionType'

export const Question = ({
  setAnswer,
  value,
  placeholder,
  isNumber,
}: QuestionProps) => {
  if (isNumber)
    return (
      <NumberField
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAnswer(e.target.value)
        }
      />
    )
  else {
    return (
      <NameField
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAnswer(e.target.value)
        }
      />
    )
  }
}
