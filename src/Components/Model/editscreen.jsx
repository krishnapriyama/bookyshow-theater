import React, { useState } from 'react'
import theaterToken from '../../../config/theaterAxios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function ModalScreen(props) {
   const navigate = useNavigate()
   const [showModal, setShowModal] = useState(false)
   const [screen, setScreen] = useState(props.screen)

   const formik = useFormik({
      initialValues: {
         screenname: screen.screenname,
         screentype: screen.screentype,
         rowcount: screen.row,
         columncount: screen.column
      },
      validate: (values) => {
         const error = {}
         if (!values.screenname) {
            error.screenname = 'Name Required'
         } else if (!values.screentype) {
            error.screentype = 'Type Required'
         } else if (!values.rowcount) {
            error.rowcount = 'Count Required'
         } else if (!values.columncount) {
            error.columncount = 'Count Required'
         }
         return error
      },
      onSubmit: async (values) => {
         setShowModal(false)
         try {
            values._id = screen._id
            const response = await theaterToken.post(
               '/theater/updateScreen',
               { ...values }
            )

            if (response) {
               window.location.reload()
            } else {
               console.log('Something went wrong')
            }
         } catch (error) {
            console.log(error, 'Error from ClientAxios')
         }
      },
   })

   return (
      <>
         <button
            className="text-white bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            type="button"
            onClick={() => setShowModal(true)}
         >
            Edit
         </button>
         {showModal ? (
            <>
               <div className="flex overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none items-center justify-center">
                  <div className="relative">
                     {/*content*/}
                     <div className="border-0  shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-center p-5 mt-7 border-b border-solid border-slate-200 rounded-t">
                           <h3 className="text-3xl font-semibold justify-center">EDIT SCREEN</h3>
                           <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                           >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                 ×
                              </span>
                           </button>
                        </div>
                        {/*body*/}
                        <form className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
                           <div className="relative p-6 flex-auto">
                              <div className="flex flex-wrap -mx-3 mb-6">
                                 <div className="w-full px-3 mb-6 md:mb-0">
                                    <label
                                       className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                                       htmlFor="grid-first-name"
                                    >
                                       Name
                                    </label>
                                    <input
                                       {...formik.getFieldProps('screenname')}
                                       className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                       id="grid-first-name"
                                       type="text"
                                       name="screenname"
                                       placeholder="Name...."
                                    />
                                    {formik.touched.screenname && formik.errors.screenname ? (
                                       <div className="text-red-500">
                                          {formik.errors.screenname}
                                       </div>
                                    ) : null}
                                 </div>
                                 <div className="w-full px-3 mb-6 md:mb-0">
                                    <label
                                       className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                                       htmlFor="grid-first-name"
                                    >
                                       Type
                                    </label>
                                    <input
                                       {...formik.getFieldProps('screentype')}
                                       className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                       id="grid-first-name"
                                       type="text"
                                       name="screentype"
                                       placeholder="Type...."
                                    />
                                    {formik.touched.screentype && formik.errors.screentype ? (
                                       <div className="text-red-500">
                                          {formik.errors.screentype}
                                       </div>
                                    ) : null}
                                 </div>
                                 <div className="w-full px-3 mb-6 md:mb-0">
                                    <label
                                       className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                                       htmlFor="grid-first-name"
                                    >
                                       Row
                                    </label>
                                    <input
                                       {...formik.getFieldProps('rowcount')}
                                       className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                       id="grid-first-name"
                                       type="text"
                                       name="rowcount"
                                       placeholder="Row...."
                                    />
                                    {formik.touched.rowcount && formik.errors.rowcount ? (
                                       <div className="text-red-500">
                                          {formik.errors.rowcount}
                                       </div>
                                    ) : null}
                                 </div>
                                 <div className="w-full px-3 mb-6 md:mb-0">
                                    <label
                                       className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                                       htmlFor="grid-first-name"
                                    >
                                       Column
                                    </label>
                                    <input
                                       {...formik.getFieldProps('columncount')}
                                       className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                       id="grid-first-name"
                                       type="text"
                                       name="columncount"
                                       placeholder="Column...."
                                    />
                                    {formik.touched.columncount && formik.errors.columncount ? (
                                       <div className="text-red-500">
                                          {formik.errors.columncount}
                                       </div>
                                    ) : null}
                                 </div>
                              </div>
                           </div>
                           {/*footer*/}
                           <div className="flex items-center justify-end  p-6 border-solid border-slate-200">
                              <button
                                 className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                 type="button"
                                 onClick={() => setShowModal(false)}
                              >
                                 Close
                              </button>
                              <button
                                 className="bg-red-500 text-black active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                 type="submit"
                              >
                                 Save Changes
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
               <div className="opacity-70 fixed w-full inset-0 z-40 bg-black"></div>
            </>
         ) : null}
      </>
   )
}
