import React, { useState } from 'react'

import {
  StyledBackground,
  StyledContainer,
  StyledCenter,
  StyledHeader,
  StyledHeaderText,
  StyledWelcomeText,
  StyledFields,
} from 'Signup/Styles/Signup.style'
import {
  EmailField,
  PasswordField,
  PrimaryGradientButton,
} from '@core/Components'
import { colors } from '@core/Constants'

export const Signup = () => {
  // Email and password props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const textContainerStyle = {
    width: '388px',
  }

  const textInputStyle = {
    fontWeight: '600',
    color: colors.darkpurple,
  }

  return (
    <StyledBackground>
      <StyledContainer>
        <StyledCenter>
          <StyledHeader>
            <StyledHeaderText>Sign up</StyledHeaderText>
            <StyledWelcomeText>Welcome to Zing!</StyledWelcomeText>
          </StyledHeader>
          <StyledFields>
            <EmailField
              containerStyle={textContainerStyle}
              inputStyle={textInputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={''} // Update these with actual errors if login is wrong
            />
            <PasswordField
              containerStyle={textContainerStyle}
              inputStyle={textInputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={''} // Update these with actual errors if login is wrong
            />
          </StyledFields>
          <PrimaryGradientButton
            label="Sign Up"
            onClick={() => {
              /* TODO do something to sign up */
            }}
          />
        </StyledCenter>
      </StyledContainer>
    </StyledBackground>
  )
}
