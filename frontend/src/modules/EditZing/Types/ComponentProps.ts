import { Student, FilterData, FiltersSelected } from './Student'

export interface GroupGridProps {
  studentList: Student[]
  /** for naming the group and maybe key?*/
  groupIndex: number
  zingId: string | null
  setStudentGroups: Function
  studentGroups: Student[][]
  moveStudentBetweenGrids: (
    studentToMove: Student,
    startingIndex: number,
    destinationIndex: number,
    setStudentGroups: Function,
    zingId: string | null
  ) => void
  moveStudentWithinGrid: (
    studentToMove: Student,
    currentGroupIndex: number,
    destinationStudentIndex: number,
    studentGroups: Student[][],
    setStudentGroups: Function
  ) => void
  categoriesShown: CategoriesShown
  filtersSelected: FiltersSelected
}

export type CategoriesShown = {
  [key: string]: boolean
}

export interface StudentGridProps {
  student: Student
  /** index of the group/grid in the outermost array */
  groupIndex: number
  /** index of the student in the inner array */
  studentIndex: number
  setStudentGroups: Function
  studentGroups: Student[][]
  moveStudentWithinGrid: (
    studentToMove: Student,
    currentGroupIndex: number,
    destinationStudentIndex: number,
    studentGroups: Student[][],
    setStudentGroups: Function
  ) => void
  categoriesShown: CategoriesShown
  filtersSelected: FiltersSelected
}

export interface FilterSidebarProps {
  filterData: FilterData
  filtersSelected: FiltersSelected
  setFiltersSelected: Function
}

export interface FilterSectionProps {
  optionStr: string
  category: string
  filtersSelected: FiltersSelected
  setFiltersSelected: Function
}

export interface CategoriesMultiselectorProps {
  categoriesShown: CategoriesShown
  setCategoriesShown: Function
}

export type OutputFileType = 'csv' | 'xls' | 'pdf'

export interface ExportFileIconButtonType {
  type: OutputFileType
  data: Student[][]
  downloadData: string
  zingName: string
}

export interface ExportButtonInformationType {
  type: OutputFileType
  downloadData: string
}

export interface ExportButtonListType {
  title: string
  buttons: ExportButtonInformationType[]
}

export interface ExportProps {
  label: string
  options: ExportButtonListType[]
  data: Student[][]
  zingName: string
}
