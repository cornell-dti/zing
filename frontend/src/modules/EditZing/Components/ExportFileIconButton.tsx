import React from 'react'
import { ReactComponent as CSVExportImg } from '@assets/img/csvexport.svg'
import { ExportFileIconButtonType } from 'EditZing/Types/ComponentProps'
import { Button } from '@material-ui/core'
import { CSV_FILE, DOWNLOAD_ALL, DOWNLOAD_NETIDS } from '@core'
import { CSVLink } from 'react-csv'
import { Data } from 'react-csv/components/CommonPropTypes'

// converts contents of the button depending on the type
export const ExportFileIconButton = ({
  type,
  data,
  downloadData,
}: ExportFileIconButtonType) => {
  // fix the typing for data here?
  const typeToSvg = (
    type: string,
    generateData: { (): any[]; (): string | Data }
  ) => {
    switch (type) {
      case CSV_FILE:
        return (
          <CSVLink data={generateData()} filename={'groups.csv'}>
            <CSVExportImg />
          </CSVLink>
        )
    }
  }

  // gets the onclick behavior
  const typeToOnClick = () => {
    switch (type) {
      case CSV_FILE:
        // empty function
        return () => {}
    }
  }

  // may need to potentially generate a header as well
  // generates data on the fly when button gets pressed
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
    <Button onClick={typeToOnClick()}>{typeToSvg(type, generateData)}</Button>
  )
}
