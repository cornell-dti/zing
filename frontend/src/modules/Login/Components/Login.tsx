import React, { useState } from 'react'

import {
  StyledBackground,
  StyledContainer,
  StyledHeader,
  StyledHeaderText,
  StyledWelcomeText,
  StyledFields,
} from 'Login/Styles/Login.style'
import { EmailField, PasswordField } from '@core/Components'

export const Login = () => {
  // Email and password props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <StyledBackground>
      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Log in</StyledHeaderText>
          <StyledWelcomeText>Welcome back!</StyledWelcomeText>
        </StyledHeader>
        <StyledFields>
          <EmailField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledFields>
      </StyledContainer>
    </StyledBackground>
  )
}
