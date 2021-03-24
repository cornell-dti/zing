import styled, { css } from 'styled-components'

import { h2, RadioButtons } from '@core'

export const StyledContainer = styled.div`
  margin: auto;
`

export const StyledRadioButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  justify-content: center;
  align-items: center;
`

export const StyledRadioButtons = styled(RadioButtons)``

export const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const StyledWelcomeText = styled.text`
  ${h2};
  font-weight: 500;
`
