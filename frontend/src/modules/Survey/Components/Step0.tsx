import React, { useState } from 'react'

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
  StyledErrorIcon,
  StyledErrorWrapper,
  StyledErrorText,
  StyledNameField,
  StyledEmailField,
} from 'Survey/Styles/Step0.style'
import { GetConnectedButton } from 'Survey/Components/UIElements/GetConnectedButton'
import { Step0Props } from 'Survey/Types'
import { colors } from '@core'
import errorIcon from '@assets/img/erroricon.svg'

export const Step0 = ({
  name,
  email,
  setName,
  setEmail,
  gotoNextStep,
}: Step0Props) => {
  /** Enums for the 4 types of validation errors that can occur on step 0 **/
  const errorEnum = {
    NONE: 0,
    NAME: 1,
    EMAIL: 2,
    BOTH: 3,
  }
  /** the current error encountered */
  const [error, setError] = useState(errorEnum.NONE)
  /** color to be passed */
  const [nameColor, setNameColor] = useState(colors.darkpurple)
  const [emailColor, setEmailColor] = useState(colors.darkpurple)

  const textContainerStyle = {
    margin: '0.75rem 0',
  }

  const nameTextInputStyle = {
    fontWeight: '600',
    color:
      error === errorEnum.NAME || error === errorEnum.BOTH
        ? colors.red
        : colors.darkpurple,
  }

  const emailTextInputStyle = {
    fontWeight: '600',
    color:
      error === errorEnum.EMAIL || error === errorEnum.BOTH
        ? colors.red
        : colors.darkpurple,
  }

  function handleNext() {
    // may want to change this to first + last name validation later
    // TODO: change this to some regex magic @Shi Chong
    if (name === '' && email === '') {
      console.log('setting both red')
      setError(errorEnum.BOTH)
      setNameColor(colors.red)
      setEmailColor(colors.red)
      return
    }
    if (name === '') {
      console.log('setting name red')
      setError(errorEnum.NAME)
      setNameColor(colors.red)
      setEmailColor(colors.darkpurple)
      return
    }
    // TODO: change this to some regex magic @Shi Chong
    if (email === '') {
      console.log('setting email red')
      setError(errorEnum.EMAIL)
      setEmailColor(colors.red)
      setNameColor(colors.darkpurple)
      return
    }
    setError(errorEnum.NONE)
    gotoNextStep()
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
          {/* <StyledErrorWrapper> */}
          <StyledNameField
            endAdornment={
              error === errorEnum.NAME || error === errorEnum.BOTH
                ? errorIcon
                : null
            }
            key={'name'}
            MuiColor={nameColor}
            containerStyle={textContainerStyle}
            inputStyle={nameTextInputStyle}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

          {/* {error === errorEnum.NAME || error === errorEnum.BOTH ? (
            <StyledErrorIcon />
          ) : null} */}
          {/* </StyledErrorWrapper> */}
          {/* <StyledErrorWrapper> */}
          <StyledEmailField
            endAdornment={
              error === errorEnum.EMAIL || error === errorEnum.BOTH
                ? errorIcon
                : null
            }
            key={'email'}
            MuiColor={emailColor}
            containerStyle={textContainerStyle}
            inputStyle={emailTextInputStyle}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          {/* {error === errorEnum.EMAIL || error === errorEnum.BOTH ? (
            <StyledErrorIcon />
          ) : null} */}
          {/* </StyledErrorWrapper> */}
        </StyledFields>
        <GetConnectedButton onClick={handleNext} />
      </StyledRightPanel>
    </StyledContainer>
  )
}
