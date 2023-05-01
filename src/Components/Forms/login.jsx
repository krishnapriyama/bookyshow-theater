import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect } from 'react'
import theaterToken from '../../../config/theaterAxios'

const login = () => {
  const navigate = useNavigate()

  const generateError = (error) =>
    toast.error(error, {
      position: 'bottom-right',
    })

    useEffect(() => {
      const theaterToken = localStorage.getItem('theaterToken')
      if (theaterToken) {
        navigate('/')
      }
    }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmpassword: '',
    },
    validate: (values) => {
      const error = {}
      if (!values.email) {
        error.email = 'Email Required'
      } else if (!values.password) {
        error.password = 'Password Required'
      } else if (values.password != values.confirmpassword) {
        error.confirmpassword = 'Password Mismatch'
      }
      return error
    },
    onSubmit: async (values) => {
      try {
        const response = await theaterToken.post(
          '/theater/login',
          {
            ...values,
          },
          { Credentials: true },
        )

        if (response.data.error == 'Admin Not accepted') {
          navigate('/waiting')
          console.log(response.data.error,'error')
          console.log('Waiting to Approve')
        } else if (response.data.created == true) {
          localStorage.setItem('theaterToken', response.data.token)
          navigate('/')
          console.log(response.data.created, 'created')
          console.log('Login Success')
        } else if (response.data.error == 'Invalid email or password') {
          generateError(response.data.error,'invalid error')
          console.log('Invalid email or password')
        }
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold">LOGIN</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  {...formik.getFieldProps('email')}
                  type="text"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  {...formik.getFieldProps('password')}
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  {...formik.getFieldProps('confirmpassword')}
                  type="password"
                  name="confirmpassword"
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                />
              </div>
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <div className="text-red-500">
                  {formik.errors.confirmpassword}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-end mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/signup"
              >
                Don't have an account?
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Login
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  )
}

export default login
