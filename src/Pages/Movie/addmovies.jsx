import React from 'react'

//components
import Sidebar from '../../Components/Sidebar/sidebar'
import Addmovies from '../../Components/Forms/addmovies'

const addmovies = () => {
  return (
   <div>
     <div className="mx-auto w-full text-white dark:bg-gray-800">
       <Addmovies></Addmovies>
     </div>
 </div>
  )
}

export default addmovies
