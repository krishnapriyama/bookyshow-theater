import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import swal from 'sweetalert';
import theaterToken from '../../../config/theaterAxios'

//components
import Modelscreen  from '../Model/editscreen'


const viewscreen = () => {
  const [screen, setScreen] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [length, SetLength] = useState()
  const itemsPerPage = 5

  useEffect(() => {
    try {
      let token = localStorage.getItem('theaterToken')
      theaterToken
        .get('/theater/view-screens')
        .then((resp) => {
          if (resp.data) {
            setScreen(resp.data.screens)
            SetLength(resp.data.screens.length)
          } else {
            setScreen([])
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = (id) => {
    swal({
       title: "Are you sure?",
       text: "Once deleted, you will not be able to recover this",
       icon: "warning",
       buttons: true,
       dangerMode: true,
    })
       .then((willDelete) => {
          if (willDelete) {
             fetch(`http://localhost:4000/theater/deleteScreen/${id}`, {
                method: 'DELETE',
                headers: {
                   'Content-Type': 'application/json',
                },
             })
                .then((response) => {
                   if (response.ok) {
                      const updatedscreen = screen.filter((s) => s._id !== id);
                      setScreen(updatedscreen);
                   } else {
                      console.error('Error deleting screen')
                      alert('Error deleting screen')
                   }
                })
                .catch((error) => {
                   console.error(error)
                   alert('Error deleting screen')
                })
          }
       });
 }

  function getCurrentPageData() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return screen.slice(startIndex, endIndex);
  }


  return (
    <div className="h-screen w-full p-0 m-0 flex justify-center items-center bg-gray-100 dark:bg-gray-800">
    <div className="relative overflow-x-auto shadow-md">
    <table className="w-full text-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
              <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
                <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Screen Name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Screen Type
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Total Count
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Row Count
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Column Count
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="justify-center items-center dark:divide-gray-700">
              {getCurrentPageData().map((s) => (
                <tr key={s.id} className='text-center items-center'>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium justify-center items-center text-white whitespace-nowrap"
                  >
                    {s.screenname}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium justify-center items-center text-white  whitespace-nowrap"
                  >
                    {s.screentype}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium justify-center items-center text-white  whitespace-nowrap"
                  >
                    {s.totalcount}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium justify-center items-center text-white  whitespace-nowrap"
                  >
                    {s.row}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium justify-center items-center text-white  whitespace-nowrap"
                  >
                    {s.column}
                  </td>
                  <td className="px-6 py-4 items-center flex justify-center gap-4">
                  <Modelscreen screen={s}></Modelscreen>
                    <button
                      type="button"
                      onClick={() => handleDelete(s._id)}
                      className="text-white bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
  pageCount={Math.ceil(screen.length / itemsPerPage)}
  pageRangeDisplayed={5}
  marginPagesDisplayed={2}
  onPageChange={({ selected }) => setCurrentPage(selected)}
  containerClassName="flex justify-center my-5"
  activeClassName="font-medium bg-blue-700 text-white py-1 px-3"
  pageClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
  previousClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
  nextClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
  breakClassName="font-medium text-gray-500 rounded-md py-1 px-3 mx-1 cursor-pointer hover:text-blue-700 hover:bg-gray-200"
  previousLabel="<<"
  nextLabel=">>"
/>
        </div>
    </div>
  )
}
export default viewscreen
