import React from 'react'

import styled, { css } from 'styled-components'
import logo from '@assets/img/purplelogo.svg'
import { colors, h2, h4, StyledComponent } from '@core'

const Logo = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={logo} alt="logo" />
  </div>
)

const panel = css`
  display: flex;
  flex-direction: column;
`

export const fullPanel = css`
  ${panel};
  height: 100%;
  width: 100%;
`

export const StyledFullPanel = styled.div`
  ${fullPanel}
  box-sizing: border-box;
  padding: 1.5rem;
  position: relative;
`

export const StyledFullPanelNoPadding = styled.div`
  ${fullPanel}
`

export const StyledContainer = styled.div`
  height: 86%;
  width: 80%;
  background-color: ${colors.white};
  box-shadow: -10px -10px 150px rgba(0, 0, 0, 0.1),
    10px 10px 150px rgba(0, 0, 0, 0.1);

  display: flex;
`

export const StyledWrapper = styled.div`
  display: flex;
`
export const StyledHeaderWrapper = styled.div`
  height: 7%;
  display: flex;
  flex-direction: column;
`
export const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const StyledLogo = styled(Logo)``
