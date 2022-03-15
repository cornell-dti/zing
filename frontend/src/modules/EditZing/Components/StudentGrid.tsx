import Paper from '@mui/material/Paper'
import { STUDENT_TYPE, DnDStudentTransferType } from 'EditZing/Types/Student'
import { StudentGridProps } from 'EditZing/Types/ComponentProps'
import { colors } from '@core'
import { useDrop, useDrag } from 'react-dnd'
import { classes, StyledGrid } from 'EditZing/Styles/StudentMUIStyle'
import { makeItems } from './Helpers'

/** the equivalent of MoveableItem */
export const StudentGrid = ({
  student,
  groupIndex,
  studentIndex,
  moveStudentWithinGrid,
  studentGroups,
  setStudentGroups,
  categoriesShown,
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
              background: isOver ? colors.darkgreen : colors.verylightviolet,
            }}
          >
            {/* displays student response answers */}
            {makeItems(student, categoriesShown)}
          </div>
        </Paper>
      </div>
    </StyledGrid>
  )
}
