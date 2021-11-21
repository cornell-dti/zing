import React from 'react'
import { ReactComponent as CSVExportImg } from '@assets/img/csvexport.svg'
import { ExportFileIconButtonType } from 'EditZing/Types/ComponentProps'
import { Button } from '@material-ui/core'
import { CSV_FILE, DOWNLOAD_ALL, DOWNLOAD_NETIDS } from '@core'
import { Student } from 'EditZing/Types/Student'
import { CSVLink } from 'react-csv'

// converts contents of the button depending on the type
export const ExportFileIconButton = ({
  type,
  data,
  downloadData,
}: ExportFileIconButtonType) => {
  // fix the typing here
  const typeToSvg = (type: string, data: any[]) => {
    switch (type) {
      case CSV_FILE:
        return (
          <CSVLink data={data} filename={'groups.csv'}>
            <CSVExportImg />
          </CSVLink>
        )
    }
  }

  // may need to potentially generate a header here
  // const generateHeaders = (data: Student[][]) => {
  //   let firstEntry = data.length > 0 ? data[0] : null
  //   if (firstEntry) {
  //   }
  // }

  const generateData = (
    type: string,
    data: Student[][],
    downloadData: string
  ) => {
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
    <Button onClick={() => {}}>
      {typeToSvg(type, generateData(type, data, downloadData))}
    </Button>
  )
}
