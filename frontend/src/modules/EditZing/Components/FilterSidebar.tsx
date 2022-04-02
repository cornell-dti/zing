import { useState, ChangeEvent } from 'react'
import { FilterSidebarProps } from 'EditZing/Types/ComponentProps'
import {
  FiltersContainer,
  FilterContainer,
  FilterHeading,
  FilterHeadingContainer,
  upSvg,
  downSvg,
  SvgContainer,
} from 'EditZing/Styles/FilterSidebar.style'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export const FilterSidebar = ({
  filterData,
  filtersSelected,
  setFiltersSelected,
}: FilterSidebarProps) => {
  const [sectionsCollapsed, setSectionsCollapsed] = useState<boolean[]>(
    Array(Object.keys(filterData).length).fill(false)
  )

  const isSectionCollapsed = (index: number) => {
    return sectionsCollapsed[index]
  }

  const checkboxComponent = (optionStr: string, category: string) => {
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        // add new category to filtersSelected if category doesn't exist
        if (!filtersSelected[category]) {
          setFiltersSelected({ ...filtersSelected, [category]: [optionStr] })
        }
        // add option to existing category
        else {
          setFiltersSelected({
            ...filtersSelected,
            [category]: [...filtersSelected[category], optionStr],
          })
        }
      } else {
        // filter out option from its category in filtersSelected object
        let newFiltersSelected = {
          ...filtersSelected,
          [category]: filtersSelected[category].filter(
            (option) => option !== optionStr
          ),
        }
        // delete category if it is now empty
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
            onChange={handleCheckboxChange}
            name={optionStr}
            value={optionStr}
            color="primary"
          />
        }
        label={optionStr}
      />
    )
  }

  const filterCheckboxes = (key: string, index: number, category: string) => {
    return isSectionCollapsed(index) ? null : (
      <FormControl
        sx={{ m: 3, margin: '0.5rem 0 0 0' }}
        component="fieldset"
        variant="standard"
      >
        <FormGroup>
          {filterData[key].options.map((option) => {
            return checkboxComponent(option.description, category)
          })}
        </FormGroup>
      </FormControl>
    )
  }

  const filters = () => {
    return Object.keys(filterData)
      .filter((key) => key !== 'location') // remove this once location is removed from backend as a default question
      .sort()
      .map((key, index) => {
        const category: string = filterData[key].questionDescription
        return (
          <FilterContainer key={key}>
            <FilterHeadingContainer
              onClick={() =>
                setSectionsCollapsed({
                  ...sectionsCollapsed,
                  [index]: !sectionsCollapsed[index],
                })
              }
            >
              <FilterHeading>{category}</FilterHeading>
              <SvgContainer>
                {isSectionCollapsed(index) ? downSvg : upSvg}
              </SvgContainer>
            </FilterHeadingContainer>
            {filterCheckboxes(key, index, category)}
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
      {filters()}
    </FiltersContainer>
  )
}
