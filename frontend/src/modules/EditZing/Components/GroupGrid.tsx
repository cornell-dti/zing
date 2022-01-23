import React from 'react'
import { useEffect } from 'react'
import { StudentGrid } from 'EditZing/Components/StudentGrid'
import Grid from '@material-ui/core/Grid'
import { GroupGridProps } from 'EditZing/Types/ComponentProps'
import { useDrop } from 'react-dnd'
import { STUDENT_TYPE, DnDStudentTransferType } from 'EditZing/Types/Student'
import {
  StyledGroupText,
  StyledGroupTextWrapper,
  StyledGroupContainer,
  StyledMetricBox,
  StyledMetricText,
} from 'EditZing/Styles/StudentAndGroup.style'

/** the equivalent of Column */
export const GroupGrid = ({
  studentList,
  groupIndex,
  zingId,
  setStudentGroups,
  studentGroups,
  moveStudentBetweenGrids,
  moveStudentWithinGrid,
  spacingConfig,
}: GroupGridProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: STUDENT_TYPE,
    drop: (item: DnDStudentTransferType) => {
      moveStudentBetweenGrids(
        item.studentToMove,
        item.groupIndex,
        groupIndex,
        setStudentGroups,
        zingId
      )
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <Grid
      item
      xs={12}
      sm={spacingConfig[0]}
      md={spacingConfig[1]}
      lg={spacingConfig[2]}
    >
      <StyledGroupContainer
        ref={drop}
        style={{ opacity: isOver ? '0.6' : '1' }}
      >
        <StyledGroupTextWrapper>
          <StyledGroupText>{'Group ' + String(groupIndex + 1)}</StyledGroupText>
          <StyledMetricBox>
            <StyledMetricText>4.0</StyledMetricText>
          </StyledMetricBox>
        </StyledGroupTextWrapper>
        <Grid container spacing={2}>
          {studentList.map((student, index) => (
            <StudentGrid
              key={index}
              moveStudentWithinGrid={moveStudentWithinGrid}
              studentIndex={index}
              groupIndex={groupIndex}
              student={student}
              studentGroups={studentGroups}
              setStudentGroups={setStudentGroups}
            />
          ))}
        </Grid>
      </StyledGroupContainer>
    </Grid>
  )
}
