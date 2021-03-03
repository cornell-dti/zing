import React, { useState } from 'react'

import {
  StyledContainer,
  StyledLeftPanel,
  StyledRightPanel,
  StyledLogo,
  StyledWhiteActionText,
  StyledTeamPic,
  StyledTitleWrapper,
  StyledHeaderText,
  StyledWelcomeText,
} from 'Survey/Styles/Step0.style'
import { NameField, EmailField, GetConnectedButton } from '@core'
import { StepProps } from 'Survey/Types'

export const Step0 = ({ gotoNextStep }: StepProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const containerStyle = {
    borderBottom: '1px solid #F1E8FE',
  }

  const inputStyle = {
    fontWeight: '600',
    color: '#E5CEFA',
  }

  return (
    <StyledContainer>
      <StyledLeftPanel>
        <StyledLogo />
        <StyledWhiteActionText>
          Connect with your classmates
        </StyledWhiteActionText>
        <StyledTeamPic />
      </StyledLeftPanel>
      <StyledRightPanel>
        <StyledTitleWrapper>
          <StyledHeaderText>Hi,</StyledHeaderText>
          <StyledWelcomeText>Welcome to Zing!</StyledWelcomeText>
        </StyledTitleWrapper>
        <NameField
          containerStyle={containerStyle}
          inputStyle={inputStyle}
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <EmailField
          containerStyle={containerStyle}
          inputStyle={inputStyle}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <GetConnectedButton onClick={gotoNextStep} />
      </StyledRightPanel>
    </StyledContainer>
  )
}
