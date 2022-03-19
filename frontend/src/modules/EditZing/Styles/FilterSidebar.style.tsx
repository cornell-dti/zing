import { colors, h4 } from '@core'
import styled from 'styled-components'

export const FilterContainer = styled.div`
  height: 100%;
  width: 400%;
  padding: 1.5rem 0rem 1.5rem 2rem;
  border-bottom: 1px solid ${colors.lightgray};
`

export const FilterHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const FilterHeading = styled.div`
  ${h4};
  font-weight: 600;
  line-height: 10px;
  color: ${colors.black};
`
