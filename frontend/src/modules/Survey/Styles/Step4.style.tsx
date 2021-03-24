import styled, { css } from 'styled-components'
import { colors, h3 } from '@core'

export { StyledInnerContainer as StyledContainer } from 'Survey/Styles/Survey.style'

const panel = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const fullPanel = css`
  ${panel};
  height: 100%;
  width: 100%;
`

export const StyledPanel = styled.div`
  ${fullPanel}
  padding: 0 6rem;
`

export const StyledText = styled.text`
  ${h3};
  color: ${colors.black};
`
