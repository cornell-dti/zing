import React, { useRef, useState, Fragment } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {
  Student,
  STUDENT_TYPE,
  DnDStudentTransferType,
} from 'EditZing/Types/Student'
import { StudentGridProps } from 'EditZing/Types/ComponentProps'
import { colors, montserratFont } from '@core'
import { useDrop, useDrag } from 'react-dnd'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: colors.black,
      fontFamily: 'Montserrat',
      fontWeight: 700,
      background: '#FFFFFF',
      border: '0.5px solid rgba(205, 156, 242, 0.15)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.07)',
      borderRadius: '10px',
    },
  })
)

/** the equivalent of MoveableItem */
export const StudentGrid = ({
  student,
  groupIndex,
  studentIndex,
  moveStudent,
}: StudentGridProps) => {
  const [isDragging, drag] = useDrag({
    item: {
      type: STUDENT_TYPE,
      groupIndex: groupIndex,
      studentToMove: student,
    },
    type: STUDENT_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const classes = useStyles()

  return (
    <Fragment>
      <Grid item xs={6} style={{ opacity: isDragging ? '1' : '0.5' }}>
        <Paper ref={drag} className={classes.paper}>
          {student.fullName}
        </Paper>
      </Grid>
    </Fragment>
  )
}
