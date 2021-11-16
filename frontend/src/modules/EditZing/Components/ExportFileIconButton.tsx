import React from 'react'
import { ReactComponent as CSVExportImg } from '@assets/img/csvexport.svg'
import { exportButtonType } from 'EditZing/Types/ComponentProps'
import { Button } from '@material-ui/core'
import { CSV_FILE } from '@core'

const typeToSvg = (type: string) => {
  switch (type) {
    case CSV_FILE:
      return <CSVExportImg />
  }
}

export const ExportFileIconButton = ({ type, fun }: exportButtonType) => {
  return <Button onClick={fun}>{typeToSvg(type)}</Button>
}
