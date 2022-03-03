import React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { STUDENT_TYPE, DnDStudentTransferType } from 'EditZing/Types/Student'
import { StudentGridProps } from 'EditZing/Types/ComponentProps'
import { genderSVG } from 'EditZing/Styles/InlineSVGs'
import { colors } from '@core'
import { useDrop, useDrag } from 'react-dnd'

const PREFIX = 'StudentGrid'

const classes = {
  root: `${PREFIX}-root`,
  paper1: `${PREFIX}-paper1`,
  paper2: `${PREFIX}-paper2`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
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

/** the equivalent of MoveableItem */
export const StudentGrid = ({
  student,
  groupIndex,
  studentIndex,
  moveStudentWithinGrid,
  studentGroups,
  setStudentGroups,
}: StudentGridProps) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: STUDENT_TYPE,
      groupIndex: groupIndex,
      studentIndex: studentIndex,
      studentToMove: student,
    },
    type: STUDENT_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop({
    accept: STUDENT_TYPE,
    drop: (item: DnDStudentTransferType) => {
      moveStudentWithinGrid(
        item.studentToMove,
        groupIndex,
        studentIndex,
        studentGroups,
        setStudentGroups
      )
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  function determineOpacity() {
    if (isDragging) {
      return '0'
    } else if (isOver) {
      return '0.9'
    } else {
      return '1.0'
    }
  }

  return (
    <StyledGrid item xs={6} ref={drop}>
      <div ref={drag}>
        <Paper
          style={{
            opacity: determineOpacity(),
            background: isOver ? colors.lightviolet : colors.verylightviolet,
          }}
          className={classes.paper1}
        >
          {student.fullName}
          <div
            className={classes.paper2}
            style={{
              opacity: determineOpacity(),
              background: isOver ? colors.lightviolet : colors.verylightviolet,
            }}
          >
            {genderSVG} {student.pronoun === 'She/Her' ? 'Female' : 'Male'}
          </div>
        </Paper>
      </div>
    </StyledGrid>
  )
}
