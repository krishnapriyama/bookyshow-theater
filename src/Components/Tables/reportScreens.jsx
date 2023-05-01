import React, { useEffect, useState } from 'react'
import theaterAxios from '../../../config/theaterAxios'

const reportScreens = () => {
  const [reportScreen, setReportedScreen] = useState([])

  useEffect(() => {
    theaterAxios
      .get('/theater/report-screen')
      .then((list) => {
        setReportedScreen(list.data.bookings)
      })
      .catch((err) => console.log(err))
  }, [])


  return (
    <div>
      <div className="h-screen w-full p-0 m-0 flex justify-center bg-gray-100 dark:bg-gray-800">
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden  mt-9">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Screen Name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Booking Count
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Sucess Count
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Failure Count
                </th>
              </tr>
            </thead>
            <tbody className="justify-center items-center dark:divide-gray-700">
            {reportScreen.map((rs)=>{
               return(
              <tr className="text-center items-center">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium justify-center items-center text-white whitespace-nowrap"
                >
                  {rs._id.screen}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium justify-center items-center text-white  whitespace-nowrap"
                >
                  {rs.count}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium justify-center items-center text-white  whitespace-nowrap"
                >
                  {rs.totalAmount}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium justify-center items-center text-white  whitespace-nowrap"
                >
                  {rs.successCount}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium justify-center items-center text-white  whitespace-nowrap"
                >
                  {rs.failureCount}
                </td>
              </tr>
               )
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default reportScreens
