import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import { FilterSidebarProps } from 'EditZing/Types/ComponentProps'

export const FilterSidebar = ({
  categoriesShown,
  setCategoriesShown,
}: FilterSidebarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriesShown({
      ...categoriesShown,
      [event.target.name]: event.target.checked,
    })
  }

  const makeCheckbox = (category: string, shouldShow: boolean) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={shouldShow}
            onChange={handleChange}
            name={category}
            color="primary"
          />
        }
        label={category}
      />
    )
  }

  const makeCheckboxes = () => {
    return Object.entries(categoriesShown).map((entry) => {
      const shouldShow = entry[1]
      const category = entry[0]
      return makeCheckbox(category, shouldShow)
    })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Show Categories</FormLabel>
        <FormGroup>{makeCheckboxes()}</FormGroup>
      </FormControl>
    </Box>
  )
}
