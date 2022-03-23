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
import { useEffect } from 'react'

export const FilterSidebar = ({
  filterData,
  setFilterData,
  filtersSelected,
  setFiltersSelected,
}: FilterSidebarProps) => {
  useEffect(() => {
    console.log(filtersSelected)
  }, [filtersSelected])
  const filterComponent = (optionStr: string, category: string) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        if (!filtersSelected[category]) {
          setFiltersSelected({ ...filtersSelected, [category]: [optionStr] })
        } else {
          setFiltersSelected({
            ...filtersSelected,
            [category]: [...filtersSelected[category], optionStr],
          })
        }
      } else {
        let newFiltersSelected = {
          ...filtersSelected,
          [category]: filtersSelected[category].filter(
            (option) => option !== optionStr
          ),
        }
        if (newFiltersSelected[category].length === 0) {
          delete newFiltersSelected[category]
        }
        setFiltersSelected(newFiltersSelected)
      }
    }
    return (
      <FormControlLabel
        key={optionStr + '-filtercheckbox'}
        control={
          <Checkbox
            onChange={handleChange}
            name={optionStr}
            value={optionStr}
            color="primary"
          />
        }
        label={optionStr}
      />
    )
  }

  const filterComponents = () => {
    return Object.keys(filterData)
      .filter((key) => key !== 'location') // remove this once location is removed from backend as a default question
      .map((key) => {
        const category: string = filterData[key].questionDescription
        return (
          <FilterContainer key={key}>
            <FilterHeadingContainer>
              <FilterHeading>{category}</FilterHeading>
            </FilterHeadingContainer>
            <FormControl
              sx={{ m: 3, margin: '0.5rem 0 0 0' }}
              component="fieldset"
              variant="standard"
            >
              <FormGroup>
                {filterData[key].options.map((option) => {
                  return filterComponent(option.description, category)
                })}
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
