import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
const token = localStorage.getItem('theaterToken')
import theaterAxios from '../../../config/theaterAxios'
import swal from 'sweetalert';

const viewmovies = () => {
  const [shows, setShows] = useState([])
  const [length, setLength] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5
  useEffect(() => {
    theaterAxios
      .get('/theater/view-show')
      .then((showlists) => {
        setShows(showlists.data)
        setLength(showlists.data.length)
      })
      .catch((err) => console.log(err))
  }, [])

  function getCurrentPageData() {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return shows.slice(startIndex, endIndex);
  }


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
             fetch(`http://localhost:4000/theater/deleteshow/${id}`, {
                method: 'DELETE',
                headers: {
                   'Content-Type': 'application/json',
                },
             })
                .then((response) => {
                   if (response.ok) {
                      const updatedmovie = shows.filter((s) => s._id !== id);
                      setShows(updatedmovie);
                   } else {
                      console.error('Error deleting movie')
                      alert('Error deleting movie')
                   }
                })
                .catch((error) => {
                   console.error(error)
                   alert('Error deleting movie')
                })
          }
       });
 }

  return (
    <div className="h-screen w-full p-0 m-0 flex justify-center items-center bg-gray-100 dark:bg-gray-800">
        <div className="relative overflow-x-auto shadow-md">
        {length > 0 ? (
       <table className="w-full text-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
       <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
         <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Screen Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Seat-Capacity
              </th>

              <th scope="col" className="px-6 py-3 font-medium">
                Movie Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Movie Poster
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Type
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                TicketPrice
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                startDate
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                EndDate
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getCurrentPageData().map((value, index) => (
              <tr className="text-white" key={index}>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
                >
                  {value.theater.screen.screenname}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  {value.theater.screen.totalcount}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  {value.Movie.moviename}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  <img
                    height={50}
                    width={50}
                    src={value.Movie.poster1}
                    alt=""
                  />
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  {value.theater.screen.screentype}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  {value.TicketPrice}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  {value.startDate.split('T')[0]}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  {value.EndDate.split('T')[0]}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-white  whitespace-nowrap"
                >
                  <br />
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800  w-20 hover:ring-4 hover:ring-green-300 font-medium rounded-lg text-sm  py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => handleDelete(value._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         ) : (
          <Link to="/add-movies">
            <button
              type="button"
              className="text-white  bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            >
              ADD Movies
            </button>
          </Link>
        )}
             <ReactPaginate
  pageCount={Math.ceil(shows.length / itemsPerPage)}
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

export default viewmovies
