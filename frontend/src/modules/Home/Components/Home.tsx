import React from 'react'
import { useHistory } from 'react-router-dom'
import GoogleButton from 'react-google-button'

import {
  StyledBackground,
  StyledButtonsWrapper,
  StyledContainer,
  StyledHeaderText,
  StyledLeftPanel,
  StyledLogo,
  StyledRightPanel,
  StyledTeacherPic,
  StyledTitleWrapper,
  StyledWelcomeText,
  StyledWhiteActionText,
} from 'Home/Styles/Home.style'
import { PrimaryGradientButton, WhiteButton } from '@core/Components'
import { signInWithGoogle } from '@fire'
import { useAppDispatch } from '@redux/hooks'
import { User, saveLogin } from '@redux/authSlice'

export const Home = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  return (
    <StyledBackground>
      <StyledContainer>
        <StyledLeftPanel>
          <StyledLogo />
          <StyledWhiteActionText>
            Create groups, connect students
          </StyledWhiteActionText>
          <StyledTeacherPic />
        </StyledLeftPanel>
        <StyledRightPanel>
          <StyledTitleWrapper>
            <StyledHeaderText>Hi,</StyledHeaderText>
            <StyledWelcomeText>Welcome to Zing!</StyledWelcomeText>
          </StyledTitleWrapper>
          <StyledButtonsWrapper>
            {/*
            <WhiteButton
              label="Log In"
              onClick={() => {
                history.push('/login')
              }}
            />
            <PrimaryGradientButton
              label="Sign Up"
              onClick={() => {
                history.push('/signup')
              }}
            />*/}
            <GoogleButton
              style={{ width: '100%' }}
              onClick={() => {
                signInWithGoogle((userData: User) => {
                  dispatch(saveLogin(userData))
                  history.push('/dashboard')
                })
              }}
            />
          </StyledButtonsWrapper>
        </StyledRightPanel>
      </StyledContainer>
    </StyledBackground>
  )
}
