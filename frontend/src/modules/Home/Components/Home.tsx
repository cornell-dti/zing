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
import { API_ROOT, CREATE_USER_API } from '@core/Constants'
import { signInWithGoogle } from '@fire'
import { useAppDispatch } from '@redux/hooks'
import { User, saveLogin } from '@redux/authSlice'
import axios from 'axios'

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
                signInWithGoogle(
                  (userData: User) => {
                    dispatch(saveLogin(userData))
                    history.push('/dashboard')
                  },
                  (info: BasicInfo) => {
                    axios.post(`${API_ROOT}${CREATE_USER_API}`, info).then(
                      (response: any) => {
                        console.log(response)
                      },
                      (error: any) => {
                        console.log(error)
                      }
                    )
                  }
                )
              }}
            />
          </StyledButtonsWrapper>
        </StyledRightPanel>
      </StyledContainer>
    </StyledBackground>
  )
}

interface BasicInfo {
  name: string
  email: string
}
