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
  Checkbox,
  NameField,
  PasswordField,
  PrimaryGradientButton,
} from '@core/Components'
import { colors } from '@core/Constants'

export const Signup = () => {
  // Name, email, password, and checked box props
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isProfessor, setIsProfessor] = useState(false)

  const textContainerStyle = {
    width: '388px',
  }

  const textInputStyle = {
    fontWeight: '600',
    color: colors.darkpurple,
  }

  const checkboxLabelStyle = {
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
            <NameField
              containerStyle={textContainerStyle}
              inputStyle={textInputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={''} // TODO error check for signup
            />
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
            <Checkbox
              labelStyle={checkboxLabelStyle}
              checked={isProfessor}
              onChange={(e) => setIsProfessor(e.target.checked)}
              label="I am a professor or other groupmaker"
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
