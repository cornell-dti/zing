import React from 'react'
import { StudentGrid } from 'EditZing/UIElements/StudentGrid'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { GroupGridProps } from 'EditZing/Types/ComponentProps'
import { colors } from '@core'
import { DndProvider, useDrop } from 'react-dnd'
import {
  Student,
  STUDENT_TYPE,
  DnDStudentTransferType,
} from 'EditZing/Types/Student'

import {
  StyledGroupText,
  StyledGroupTextWrapper,
  StyledGroupContainer,
} from 'EditZing/Styles/GeneralStyle.style'

/** the equivalent of Column */
export const GroupGrid = ({
  studentList,
  groupIndex,
  moveStudentBetweenGrids,
  moveStudentWithinGrid,
}: GroupGridProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
        background: '#FFFFFF',
        overflowY: 'scroll' as 'scroll',
      },
    })
  )
  const classes = useStyles()

  const [{ isOver }, drop] = useDrop({
    accept: STUDENT_TYPE,
    drop: (item: DnDStudentTransferType, monitor) =>
      // console.log('groupgrid'),
      moveStudentBetweenGrids(item.studentToMove, item.groupIndex, groupIndex),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <Grid item xs={3} className={classes.root}>
      <StyledGroupContainer
        ref={drop}
        style={{ opacity: isOver ? '0.6' : '1' }}
      >
        <StyledGroupTextWrapper>
          <StyledGroupText>{'Group ' + String(groupIndex + 1)}</StyledGroupText>
        </StyledGroupTextWrapper>
        <Grid container item spacing={1}>
          {studentList.map((student, index) => (
            <StudentGrid
              key={index}
              moveStudentBetweenGrids={moveStudentBetweenGrids}
              moveStudentWithinGrid={moveStudentWithinGrid}
              studentIndex={index}
              groupIndex={groupIndex}
              student={student}
            />
          ))}
        </Grid>
      </StyledGroupContainer>
    </Grid>
  )
}
