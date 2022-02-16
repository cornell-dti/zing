import React, { useState } from 'react'
import { ReactComponent as CSVExportImg } from '@assets/img/csvexport.svg'
import { ExportFileIconButtonType } from 'EditZing/Types/ComponentProps'
import { ButtonUnstyled } from '@mui/material'
import { CSV_FILE, DOWNLOAD_ALL, DOWNLOAD_NETIDS } from '@core'
import { CSVLink } from 'react-csv'
import { styled } from '@mui/material/styles'

const FileIconButton = styled('button')`
  border: none;
  background-color: transparent;
`

// converts contents of the button depending on the type
export const ExportFileIconButton = ({
  type,
  data,
  downloadData,
  zingName,
}: ExportFileIconButtonType) => {
  const [exportData, setExportData] = useState<any[]>([])

  const typeToSvg = () => {
    switch (type) {
      case CSV_FILE:
        return (
          <CSVLink
            data={exportData}
            filename={`${zingName.toLowerCase()}_groups.csv`}
          >
            <CSVExportImg />
          </CSVLink>
        )
    }
  }

  // gets the onclick behavior, this will be called by the export button itself
  const typeToOnClick = () => {
    switch (type) {
      case CSV_FILE:
        setExportData(generateData())
    }
  }

  // may need to potentially generate a header as well based on ordering of
  // the headers in the file (if they are not desired)
  // this should be called with "typeToOnClick" in order to generate data
  // on the fly when that button gets pressed
  const generateData = () => {
    let newData: any[] = []

    switch (downloadData) {
      case DOWNLOAD_ALL:
        switch (type) {
          case CSV_FILE:
            data.forEach((group, i) => {
              group.forEach((d) => {
                let new_d = { ...d, group: i + 1 }
                newData.push(new_d)
              })
            })
            break
        }
        break
      case DOWNLOAD_NETIDS:
        break
    }

    return newData
  }

  return (
    <ButtonUnstyled onClick={typeToOnClick} component={FileIconButton}>
      {typeToSvg()}
    </ButtonUnstyled>
  )
}
