import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import CinimasAxios from '../../../config/theaterAxios'
let coulumSeat = []
let seat = []

function Seatselect() {
  const navigate = useNavigate()
  const [seatcount, setSeatcount] = useState('')
  const [columCount, setColumncount] = useState('')
  const [screens, setScreens] = useState([])
  const [selectedScreenId, setSelectedScreenId] = useState('')
  const [movie, setMovie] = useState([])

  const [tempmovie, settempMovie] = useState([])
  const [time, setTime] = useState([])
  const [fullData, setFullData] = useState([])
  const [showdate, setDate] = useState(new Date())

  const [selectedSeat, setSelectedSeat] = useState([])
  const [selectedMovie, setSelectedMovie] = useState([])
  const [selectedTime, setSelectedTime] = useState('')
  const [bookedSeats, setBookedSeats] = useState([])

  useEffect(() => {
    CinimasAxios.get('/theater/shows').then(({ data }) => {
      const screenNames = Array.from(
        new Set(data.map((shows) => shows?.theater?.screen?.screenname)),
      )
      setScreens(screenNames)
      setFullData(data)
    })
  }, [screens])

  for (let i = 0; i < seatcount; i++) {
    seat[i] = i
  }
  for (let j = 0; j < columCount; j++) {
    coulumSeat[j] = String.fromCharCode(65 + j)
  }
  const Seatselect = (event) => {
    if (event.currentTarget.style.backgroundColor === 'red') {
      event.currentTarget.style.backgroundColor = 'white'
    } else {
      event.currentTarget.style.backgroundColor = 'red'
    }
    if (!selectedSeat.includes(event.target.value)) {
      setSelectedSeat([...selectedSeat, event.target.value])
    } else {
      setSelectedSeat(selectedSeat.filter((val) => val !== event.target.value))
    }
  }

  const handleScreenChange = (event) => {
    const screen = event.target.value
    setSelectedScreenId(screen)
    if (screen) {
      const movies = fullData.filter(
        (show) => show.theater.screen.screenname === screen,
      )
      settempMovie(movies)
    }
  }
  function timechange(e) {
    setSelectedTime(e.target.value)
    CinimasAxios.post('/bookedseats', {
      date: showdate,
      time: e.target.value,
      screen_id: selectedMovie?.theater?.screen?._id,
    }).then((resp) => {
      setBookedSeats(resp?.data?.seats)
      setSeatcount(resp.data?.screenseats?.theater?.screen?.row)
      setColumncount(resp.data?.screenseats?.theater?.screen?.column)
    })
    bookedSeats.map((value) => {
      document.getElementById(value).style.backgroundColor = 'gray'
      document.getElementById(value).disabled = true
    })
    setSeatcount(selectedMovie.theater.screen.row)
    setColumncount(selectedMovie.theater.screen.column)
  }

  function CheckTimeAvailable(event) {
    const movieid = event.target.value
    const date = movie.filter((show) => show.Movie._id == movieid)
    setTime(date[0].ShowTimes)
    setSelectedMovie(date[0])
  }

  function filterWithDate(event) {
    const date = event.target.value
    setDate(date)
    const movies = tempmovie.filter(
      (show) => new Date(show.EndDate) > new Date(date),
    )
    setMovie(movies)
  }

  function reservation(seat) {
    if (selectedSeat.length <= 0) {
      swal({
        title: 'Select Seat first!',
        text: 'Minimum One Seat!',
        icon: 'warning',

        dangerMode: false,
      })
    } else {
      CinimasAxios.post('/seatbook', {
        BookingDate: new Date(),
        show: {
          date: new Date(showdate),
          time: selectedTime,
          SeatNumber: seat,
          price: selectedMovie?.TicketPrice,
          TotelPrice: seat.length * selectedMovie?.TicketPrice,
        },
        movie: selectedMovie.Movie,
        theater: selectedMovie.theater,
      }).then((resp) => {
        swal({
          title: 'success',
          text: `${seat} Selected`,
          icon: 'success',
          dangerMode: false,
        }).then(() => {
          navigate('/view-booking')
        })
      })
    }
  }

  return (
    <>
      <div className="bg-gray-800 h-40 w-full gap-6 p-28 flex justify-center items-center">
        <select
          className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={handleScreenChange}
          value={selectedScreenId}
        >
          <option value="">Select Screen</option>
          {screens.map((screen, index) => (
            <option key={index} value={screen}>
              {screen}
            </option>
          ))}
        </select>
        <div className="w-full md:w-1/2 px-3">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            type="date"
            name="date"
            placeholder="Name"
            value={showdate}
            onChange={filterWithDate}
          />
        </div>
        <select
          className="appearance-none block w-1/3 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={CheckTimeAvailable}
        >
          <option value="">Select Movie</option>
          {movie.map((m) => (
            <option key={m._id} value={m.Movie._id}>
              {m.Movie.moviename}
            </option>
          ))}
        </select>

        <select
          id="timeid"
          className="appearance-none block w-1/3 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={timechange}
        >
          {time.length == 1 ? (
            <option value={time}>{time}</option>
          ) : (
            <>
              <option value="">Select Time</option>
              {time.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      <div className="bg-gray-800 h-[900px] flex justify-center">
        <div className="w-full max-w-screen-lg mt-7 bg-gray-800 flex flex-col gap-6 p-6">
          <div className="w-[100%]">
            {coulumSeat.map((value, index) => {
              return (
                <div className="flex gap-3 justify-center" key={value}>
                  {seat.map((data, index) => {
                    return (
                      <button
                        className="h-[40px] w-[70px] rounded-lg bg-white mt-2 cursor-pointer"
                        value={value + index}
                        id={value + index}
                        key={value + index}
                        onClick={(event) => {
                          Seatselect(event)
                        }}
                      >
                        {index == 0 && value}
                        {value == 'A' && data}
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full flex flex-col gap-4 p-4 bg-gray-700 rounded-lg">
              <h1 className="text-4xl font-bold  text-gray-100 justify-center flex">
                <span className="text-[#29fadede] ">MovieName</span>
                -Genre
              </h1>
              <h2 className="text-lg font-bold text-gray-100 justify-center flex">
                Description
              </h2>
              <hr className="border-t-2 border-gray-500" />
              <h3 className="text-md font-bold text-gray-100">
                Selected Seats:{' '}
                <span className="text-gray-300">{selectedSeat}</span>
              </h3>
              {selectedSeat.length > 0 && (
                <h4 className="text-md font-semibold text-gray-100">
                  Total Price:{' '}
                  <span className="text-gray-300">
                    {selectedSeat.length * Number(selectedMovie?.TicketPrice)},
                  </span>
                </h4>
              )}
              <button
                onClick={() => {
                  reservation(selectedSeat)
                }}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#b48d8d]"
              >
                Book Your Seat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Seatselect
