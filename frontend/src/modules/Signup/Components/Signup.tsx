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

  /** Error messages */
  enum SignupError {
    NONE = '',
    NAME = 'Please enter your name',
    EMAIL = 'Please enter your email',
    EMAIL_EXISTS = 'Email already exists!',
    PASS = 'Please enter a password',
  }
  const [nameError, setNameError] = useState(SignupError.NONE)
  const [emailError, setEmailError] = useState(SignupError.NONE)
  const [passwordError, setPasswordError] = useState(SignupError.NONE)

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(e.target.value === '' ? SignupError.NAME : SignupError.NONE)
    setName(e.target.value)
  }

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(e.target.value === '' ? SignupError.EMAIL : SignupError.NONE)
    setEmail(e.target.value)
  }

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(
      e.target.value === '' ? SignupError.PASS : SignupError.NONE
    )
    setPassword(e.target.value)
  }

  const textContainerStyle = {
    width: '388px',
  }

  const textInputStyle = {
    fontWeight: '600',
    color: colors.darkpurple,
  }

  const textInputErrorStyle = {
    fontWeight: '600',
    color: colors.red,
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
              inputStyle={nameError ? textInputErrorStyle : textInputStyle}
              value={name}
              onChange={handleSetName}
              error={nameError} // TODO error check for signup
            />
            <EmailField
              containerStyle={textContainerStyle}
              inputStyle={emailError ? textInputErrorStyle : textInputStyle}
              value={email}
              onChange={handleSetEmail}
              error={emailError} // Update these with actual errors if login is wrong
            />
            <PasswordField
              containerStyle={textContainerStyle}
              inputStyle={passwordError ? textInputErrorStyle : textInputStyle}
              value={password}
              onChange={handleSetPassword}
              error={passwordError} // Update these with actual errors if login is wrong
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
