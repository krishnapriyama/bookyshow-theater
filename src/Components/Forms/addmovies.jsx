import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import theaterToken from '../../../config/theaterAxios'

let token = localStorage.getItem('theaterToken')
const timeOptions = [
  { value: '9.45', label: '9.45' },
  { value: '12.35', label: '12.35' },
  { value: '4.00', label: '4.00' },
  { value: '7.30',},
  { value: '10.30'},
]

const addmovies = () => {
  const navigate = useNavigate()
  const [ShowTimes, setShowTimes] = useState([
    timeOptions[1],
    timeOptions[2],
    timeOptions[4],
  ])
  const [movies, setMovies] = useState([])
  const [screens, setScreen] = useState([])

  const handleTimingsChange = (selectedOptions) => {
    setShowTimes(selectedOptions)
  }

  useEffect(() => {
    theaterToken.get('/admin/view-movies').then((response) => {
      setMovies(response.data)
    })

    theaterToken
      .get('/theater/view-screens')
      .then((resp) => {
        if (resp.data) {
          setScreen(resp.data.screens)
        } else {
          setScreen([])
        }
      })
  }, [])

  const formik = useFormik({
    initialValues: {
      screen: '',
      movie: '',
      startDate: '',
      EndDate: '',
      TicketPrice: '',
    },
    validate: (values) => {
      const error = {}
      if (!values.screen) {
        error.screen = 'Screen Required'
      } else if (!values.movie) {
        error.movie = 'Movie Required'
      } else if (!values.startDate) {
        error.startDate = 'Date Required'
      } else if (!values.EndDate) {
        error.EndDate = 'Date Required'
      } else if (!values.TicketPrice) {
        error.TicketPrice = 'Price Required'
      }
      return error
    },
    onSubmit: async (values) => {
      values.ShowTimes=ShowTimes;
      try {
        const response = await theaterToken.post(
          '/theater/add-Show',
          { ...values },
          
          
        )
        if (response) {
          navigate('/view-movies')
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error, 'Error from ClientAxios')
      }
    },
  })

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="w-full max-w-lg ml-4" onSubmit={formik.handleSubmit}>
        <h1 className="font-bold text-2xl items-center justify-center flex mb-11">
          ADD MOVIES
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Screen
            </label>
            <select
              {...formik.getFieldProps('screen')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="screen"
              placeholder="date"
            >
              <option value="">Select</option>
              {screens.map((screen) => (
                <option key={screen.id} value={screen._id}>
                  {screen.screenname}
                </option>
              ))}
            </select>
            {formik.touched.screen && formik.errors.screen ? (
              <div className="text-red-500">{formik.errors.screen}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Movie
            </label>
            <select
              {...formik.getFieldProps('movie')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="movie"
              placeholder="date"
            >
              <option value="">Select</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie._id}>
                  {movie.moviename}
                </option>
              ))}
            </select>
            {formik.touched.movie && formik.errors.movie ? (
              <div className="text-red-500">{formik.errors.movie}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              start date
            </label>
            <input
              {...formik.getFieldProps('startDate')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="date"
              name="startDate"
              placeholder="Name"
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className="text-red-500">{formik.errors.startDate}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              end date
            </label>
            <input
              {...formik.getFieldProps('EndDate')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="date"
              name="EndDate"
              placeholder="Name"
            />
            {formik.touched.EndDate && formik.errors.EndDate ? (
              <div className="text-red-500">{formik.errors.EndDate}</div>
            ) : null}
          </div>
        </div>
        <div className="w-full">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="movie-timing"
          >
            Movie timings
          </label>
          <Select
            value={ShowTimes}
            onChange={handleTimingsChange}
            isMulti
            name="timings"
            options={timeOptions}
            className="w-full text-black"
            classNamePrefix="select"
          />
          {ShowTimes.length === 0 ? (
            <div className="text-red-500">
              Please select at least one timing
            </div>
          ) : null}
        </div>
        <div className="w-full mt-8">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Ticket Price
          </label>
          <input
            {...formik.getFieldProps('TicketPrice')}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="number"
            name="TicketPrice"
            placeholder="Ticket Price"
          />
          {formik.touched.TicketPrice && formik.errors.TicketPrice ? (
            <div className="text-red-500">{formik.errors.TicketPrice}</div>
          ) : null}
        </div>

        <div className="w-full px-3 mt-9 items-end flex justify-end">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default addmovies
