import { useEffect, useState } from 'react'
import { colors } from '@core'
import { CategoriesMultiselectorProps } from 'EditZing/Types/ComponentProps'
import { getChipIcon } from './Helpers'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const ITEM_WIDTH = 400
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: ITEM_WIDTH,
    },
  },
}

function getMenuItemStyles(
  name: string,
  categoriesSelected: string[],
  theme: Theme
) {
  return {
    fontWeight:
      categoriesSelected.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    height: ITEM_HEIGHT,
  }
}

export const CategoriesMultiselector = ({
  categoriesShown,
  setCategoriesShown,
}: CategoriesMultiselectorProps) => {
  const theme = useTheme()

  // due to MUI api, we have to use an arrayified of categoriesShown
  // so instead of { string: boolean } we have to format the data as string[]
  const [categoriesShownArr, setCategoriesShownArr] = useState<string[]>([])

  useEffect(() => {
    setCategoriesShownArr(
      Object.keys(categoriesShown).filter(
        (category) => categoriesShown[category]
      )
    )
  }, [categoriesShown])

  const handleChange = (
    event: SelectChangeEvent<typeof categoriesShownArr>
  ) => {
    const {
      target: { value },
    } = event

    // On autofill we get a stringified value, must parse appropriately
    const newCategoriesSelected =
      typeof value === 'string' ? value.split(',') : value

    setCategoriesShownArr(newCategoriesSelected)
    let newCategoriesShown = { ...categoriesShown }
    for (let category of Object.keys(categoriesShown)) {
      newCategoriesShown[category] = newCategoriesSelected.includes(category)
    }
    setCategoriesShown(newCategoriesShown)
  }

  const handleDelete = (value: string) => {
    const newCategoriesSelected = categoriesShownArr.filter(
      (category) => category !== value
    )
    setCategoriesShownArr(newCategoriesSelected)
    let newCategoriesShown = { ...categoriesShown }
    for (let category of Object.keys(categoriesShown)) {
      newCategoriesShown[category] = newCategoriesSelected.includes(category)
    }
    setCategoriesShown(newCategoriesShown)
  }

  return (
    <FormControl
      sx={{
        m: 1,
        width: ITEM_WIDTH,
        '& .MuiChip-root': {
          borderRadius: '5px',
        },
      }}
    >
      <InputLabel id="demo-multiple-chip-label">View Categories</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={categoriesShownArr}
        onChange={handleChange}
        input={
          <OutlinedInput id="select-multiple-chip" label="View Categories" />
        }
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {selected.sort().map((value) => (
              <Chip
                key={value}
                label={value}
                sx={{ background: colors.purple30 }}
                onMouseDown={(event) => {
                  event.stopPropagation() // Prevent click from being captured by parent
                }}
                icon={getChipIcon(value)}
                onDelete={() => handleDelete(value)}
                deleteIcon={<span>&times;</span>}
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
              style={getMenuItemStyles(category, categoriesShownArr, theme)}
            >
              {getChipIcon(category)} {category}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
