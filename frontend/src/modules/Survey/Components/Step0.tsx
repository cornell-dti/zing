import React, { useState } from 'react'

import { NameField, EmailField, colors } from '@core'
import {
  StyledContainer,
  StyledLeftPanel,
  StyledRightPanel,
  StyledFields,
  StyledLogo,
  StyledWhiteActionText,
  StyledTeamPic,
  StyledTitleWrapper,
  StyledHeaderText,
  StyledWelcomeText,
} from 'Survey/Styles/Step0.style'
import { GetConnectedButton } from 'Survey/Components/UIElements/GetConnectedButton'

export const Step0 = ({
  gotoNextStep,
  name,
  email,
  setName,
  setEmail,
}: Step0Props) => {
  const textContainerStyle = {
    margin: '0.75rem 0',
  }

  const textInputStyle = {
    fontWeight: '600',
    color: colors.lightviolet,
  }

  const [hasError, setHasError] = useState(false)

  const handleNext = () => {
    if (name === '' || email === '') setHasError(true)
    else gotoNextStep()
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
        <StyledFields>
          <NameField
            containerStyle={textContainerStyle}
            inputStyle={textInputStyle}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            error={hasError && name === '' ? 'Please enter your name' : ''}
          />
          <EmailField
            containerStyle={textContainerStyle}
            inputStyle={textInputStyle}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={hasError && email === '' ? 'Please enter your email' : ''}
          />
        </StyledFields>
        <GetConnectedButton onClick={handleNext} />
      </StyledRightPanel>
    </StyledContainer>
  )
}

interface Step0Props {
  name: string
  email: string
  setName: (n: string) => void
  setEmail: (e: string) => void
  gotoNextStep: () => void
}
