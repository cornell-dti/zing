import { useEffect, useState } from 'react'
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
  filtersSelected,
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

  const [selectedByFilter, setSelectedByFilter] = useState<boolean>(false)

  useEffect(() => {
    if (Object.keys(filtersSelected).length === 0) {
      setSelectedByFilter(false)
      return
    }
    // AND together all categories with selected filters
    let satisfiedAND = true
    Object.values(filtersSelected).every((filterCriteriaList) => {
      // OR all selected filters within each category
      let satisfiedOR = false
      for (let index in filterCriteriaList) {
        const filterCriteria = filterCriteriaList[index]
        satisfiedOR =
          satisfiedOR || Object.values(student).includes(filterCriteria)
      }
      satisfiedAND = satisfiedAND && satisfiedOR
      if (!satisfiedAND) {
        return false // breaks out of every loop when falsy value is returned
      }
      return true // return non-falsy to continue
    })
    setSelectedByFilter(satisfiedAND)
  }, [filtersSelected, student])

  function determineBackground() {
    return selectedByFilter ? colors.purple30 : colors.verylightviolet
  }

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
            background: determineBackground(),
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          className={classes.paper1}
        >
          {student.fullName}
          <div
            className={classes.paper2}
            style={{
              opacity: determineOpacity(),
              background: determineBackground(),
              cursor: isDragging ? 'grabbing' : 'grab',
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
