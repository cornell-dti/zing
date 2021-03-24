import styled, { css } from 'styled-components'

import { colors, h3 } from '@core'

const defaultContainerStyle = css`
  text-align: left;
  justify-content: center;
  align-items: center;
  color: ${colors.black};
  width: 100%;
`

export const StyledContainer = styled.div`
  ${defaultContainerStyle}
`

const defaultLabelStyle = css`
  ${h3};
  font-weight: 400;
`

export const StyledLabel = styled.label`
  ${defaultLabelStyle}
`
