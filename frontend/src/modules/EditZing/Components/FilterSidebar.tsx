import { FilterSidebarProps } from 'EditZing/Types/ComponentProps'
import {
  FiltersContainer,
  FilterContainer,
  FilterHeading,
  FilterHeadingContainer,
} from 'EditZing/Styles/FilterSidebar.style'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { StringJSON } from 'EditZing/Types/Student'
const categoryNames: StringJSON = require('EditZing/categoryNames')

export const FilterSidebar = ({
  filterData,
  setFilterData,
  filtersSelected,
  setFiltersSelected,
}: FilterSidebarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.warn(filterData.identity.options)
      setFiltersSelected([...filtersSelected, event.target.name])
    } else {
      setFiltersSelected(
        filtersSelected.filter((name) => name !== event.target.name)
      )
    }
  }

  const filterComponent = (option: string) => {
    return (
      <FormControlLabel
        key={option + '-filtercheckbox'}
        control={
          <Checkbox
            checked={filtersSelected.includes(option)}
            onChange={handleChange}
            name={option}
            value={option}
            color="primary"
          />
        }
        label={option}
      />
    )
  }

  const filterComponents = () => {
    return Object.keys(filterData)
      .filter((key) => key !== 'location') // remove this once location is removed from backend as a default question
      .map((key) => {
        return (
          <FilterContainer key={key}>
            <FilterHeadingContainer>
              <FilterHeading>
                {categoryNames[key] || filterData[key].questionDescription}
              </FilterHeading>
            </FilterHeadingContainer>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormGroup>
                {filterData[key].options.map((option) => {
                  return filterComponent(option.description)
                })}
                <FormControlLabel
                  control={<Checkbox onChange={handleChange} name="jason" />}
                  label="Jason Killian"
                />
              </FormGroup>
            </FormControl>
          </FilterContainer>
        )
      })
  }

  return (
    <FiltersContainer>
      <FilterContainer>
        <FilterHeadingContainer>
          <FilterHeading>Filter by</FilterHeading>
        </FilterHeadingContainer>
      </FilterContainer>
      {filterComponents()}
    </FiltersContainer>
  )
}
