import { FilterSidebarProps } from 'EditZing/Types/ComponentProps'
import {
  FilterContainer,
  FilterHeading,
  FilterHeadingContainer,
} from 'EditZing/Styles/FilterSidebar.style'

export const FilterSidebar = ({}: FilterSidebarProps) => {
  return (
    <FilterContainer>
      <FilterHeadingContainer>
        <FilterHeading>Filter by</FilterHeading>
      </FilterHeadingContainer>
    </FilterContainer>
  )
}
