import { colors, h4 } from '@core'
import styled from 'styled-components'

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
`

export const FilterContainer = styled.div`
  width: 20rem;
  padding: 1.5rem 0rem 1.5rem 2rem;
  border-bottom: 1px solid ${colors.lightgray};
`
// align svgs to the right of this div
export const FilterHeadingContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
`

export const FilterHeading = styled.div`
  ${h4};
  font-weight: 600;
  line-height: 10px;
  color: ${colors.black};
`

export const SvgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 1rem;
`

export const downSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 9L12 16L5 9"
      stroke="#2F2E41"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const upSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 15L12 8L19 15"
      stroke="#2F2E41"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)
