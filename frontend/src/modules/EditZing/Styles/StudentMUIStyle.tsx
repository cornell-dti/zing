import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { colors } from '@core'
// need this extra module for student styles because MUI "styled" is a duplicate identifier as StyledComponents "Styled"
const PREFIX = 'StudentGrid'

export const classes = {
  root: `${PREFIX}-root`,
  paper1: `${PREFIX}-paper1`,
  paper2: `${PREFIX}-paper2`,
}

export const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.root}`]: {
    flexGrow: 1,
  },

  [`& .${classes.paper1}`]: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: colors.black,
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 14,
    border: '0px solid rgba(205, 156, 242, 0.15)',
    boxShadow: '0px 2px 5px rgba(205, 156, 242, 0.2);',
    borderRadius: '10px',
  },

  [`& .${classes.paper2}`]: {
    textAlign: 'left',
    color: colors.black,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: 14,
  },
}))
