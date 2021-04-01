import React, { useState } from 'react'

import { NameField, EmailField } from '@core'
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
import { StepTemplateProps } from 'Survey/Types'

export const Step0 = ({ gotoNextStep }: StepTemplateProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const textContainerStyle = {
    margin: '0.75rem 0',
  }

  const textInputStyle = {
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
        <StyledFields>
          <NameField
            containerStyle={textContainerStyle}
            inputStyle={textInputStyle}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <EmailField
            containerStyle={textContainerStyle}
            inputStyle={textInputStyle}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </StyledFields>
        <GetConnectedButton onClick={gotoNextStep} />
      </StyledRightPanel>
    </StyledContainer>
  )
}
