import { useState } from 'react'
import { StudentGrid } from 'EditZing/Components/StudentGrid'
import Grid, { GridSize } from '@mui/material/Grid'
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

export const GroupGrid = ({
  studentList,
  groupIndex,
  moveStudentBetweenGrids,
  moveStudentWithinGrid,
  zingId,
  setStudentGroups,
  studentGroups,
  filterMode,
  categoriesShown,
}: GroupGridProps) => {
  // add useEffect to react to filterMode changes to alter breakpoints for grids
  const [breakpoints] = useState<GridSize[]>([12, 7, 5, 4])
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
      xs={breakpoints[0]}
      sm={breakpoints[1]}
      md={breakpoints[2]}
      lg={breakpoints[3]}
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
              categoriesShown={categoriesShown}
            />
          ))}
        </Grid>
      </StyledGroupContainer>
    </Grid>
  )
}
