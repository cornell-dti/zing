import { useEffect, useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import { colors } from '@core'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { CategoriesMultiselectorProps } from 'EditZing/Types/ComponentProps'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, categoriesSelected: string[], theme: Theme) {
  return {
    fontWeight:
      categoriesSelected.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export const CategoriesMultiselector = ({
  categoriesShown,
  setCategoriesShown,
}: CategoriesMultiselectorProps) => {
  const theme = useTheme()
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([])

  useEffect(() => {
    setCategoriesSelected(
      Object.keys(categoriesShown).filter(
        (category) => categoriesShown[category]
      )
    )
  }, [categoriesShown])

  const handleChange = (
    event: SelectChangeEvent<typeof categoriesSelected>
  ) => {
    const {
      target: { value },
    } = event

    // On autofill we get a stringified value, must parse appropriately
    const newCategoriesSelected =
      typeof value === 'string' ? value.split(',') : value

    setCategoriesSelected(newCategoriesSelected)
    let newCategoriesShown = { ...categoriesShown }
    for (let category of Object.keys(categoriesShown)) {
      newCategoriesShown[category] = newCategoriesSelected.includes(category)
    }
    setCategoriesShown(newCategoriesShown)
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">View Categories</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={categoriesSelected}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="View Categories" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  style={{ background: colors.lightviolet }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(categoriesShown)
            .sort()
            .map((category) => (
              <MenuItem
                key={category}
                value={category}
                style={getStyles(category, categoriesSelected, theme)}
              >
                {category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  )
}
