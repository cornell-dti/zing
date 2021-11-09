import React from 'react'
// import { Button } from '@core/Components'
import { ReactComponent as CSVExportImg } from '@assets/img/csvexport.svg'
import { exportButtonType } from 'EditZing/Types/ComponentProps'
import { Button } from '@material-ui/core'

const typeToSvg = (type: string) => {
  switch (type) {
    case 'csv':
      return <CSVExportImg />
  }
}

export const ExportFileIconButton = ({ type, fun }: exportButtonType) => {
  return <Button onClick={fun}>{typeToSvg(type)}</Button>
}
