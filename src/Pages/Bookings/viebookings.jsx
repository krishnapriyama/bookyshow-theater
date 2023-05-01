import React from 'react'

//components
import Sidebar from '../../Components/Sidebar/sidebar'
import Viewbooking from '../../Components/Tables/viewbookings'

const viewbooking = () => {
  return (
   <div>
     <div className="mx-auto w-full text-white dark:bg-gray-800">
       <Viewbooking></Viewbooking>
     </div>
 </div>
  )
  
}

export default viewbooking
