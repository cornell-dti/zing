import { FilterSidebarProps } from 'EditZing/Types/ComponentProps'
import {
  FiltersContainer,
  FilterContainer,
  FilterHeading,
  FilterHeadingContainer,
} from 'EditZing/Styles/FilterSidebar.style'
import Box from '@mui/material/Box'
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
  console.warn(filterData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFiltersSelected([...filtersSelected, event.target.name])
    } else {
      setFiltersSelected(
        filtersSelected.filter((name) => name !== event.target.name)
      )
    }
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
            <Box sx={{ display: 'flex' }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} name="gilad" />}
                    label="Gilad Gray"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} name="jason" />}
                    label="Jason Killian"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleChange} name="antoine" />
                    }
                    label="Antoine Llorca"
                  />
                </FormGroup>
              </FormControl>
            </Box>
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
