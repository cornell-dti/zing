import React from 'react'
import moment from 'moment'
import {
  StyledContainer,
  StyledName,
  StyledRows,
  StyledRow,
  StyledClock,
  StyledManIcon,
  StyledText,
  StyledButtons,
} from 'Dashboard/Styles/GroupCard.style'
import { Button, colors } from '@core'

export const GroupCard = ({
  key,
  name,
  submitted,
  total,
  deadline,
}: GroupCardProps) => {
  return (
    <StyledContainer key={key}>
      <StyledName>{name}</StyledName>
      <StyledRows>
        <StyledRow>
          <StyledManIcon />
          <StyledText>{submitted} Forms Submitted</StyledText>
        </StyledRow>
        <StyledRow>
          <StyledClock />
          <StyledText>{moment(deadline).format('Do MMM YYYY')}</StyledText>
        </StyledRow>
      </StyledRows>
      <StyledButtons>
        <Button
          containerStyle={{
            background: new Date() > deadline ? colors.white : colors.purple,
            border:
              new Date() > deadline ? `1px solid ${colors.purple}` : '0px',
            width: '45%',
            borderRadius: '40px',
          }}
          labelStyle={{
            color: new Date() > deadline ? colors.purple : colors.white,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
          }}
          onClick={() => {}}
          label={'Copy link'}
        />
        {new Date() > deadline && (
          <Button
            containerStyle={{
              background: colors.purple,
              width: '45%',
              borderRadius: '40px',
            }}
            labelStyle={{
              color: colors.white,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            }}
            onClick={() => {}}
            label={'Match'}
          />
        )}
      </StyledButtons>
    </StyledContainer>
  )
}

interface GroupCardProps {
  key: number
  name: string
  submitted: number
  total: number
  deadline: Date
}
