import React from 'react'

//components
import CardLineChart from '../../Components/Cards/cardlinechart'
import CardBarChart from '../../Components/Cards/cardbarchart'
import CardPage from '../../Components/Cards/cardpagevisit'
import CardSocial from '../../Components/Cards/cardsocial'
import Statics from '../../Components/Cards/statictics'

const dashboard = () => {
  return (
    <>
    <div className='h-screen bg-gray-800'>
      <Statics></Statics>

<div className="px-4 md:px-10 mx-auto -m-24">
  <div className="flex flex-wrap">
    <div className="w-screen xl:w-8/12 mb-12 xl:mb-0 px-4 bg-gray-800">
      <CardLineChart />
    </div>
    <div className="w-screen xl:w-4/12 px-4">
      <CardBarChart />
    </div>
  </div>
  <div className="flex flex-wrap mt-4">
    <div className="w-screen xl:w-8/12 mb-12 xl:mb-0 px-4">
    <CardLineChart />
    </div>
    <div className="w-screen xl:w-4/12 px-4">
      <CardSocial />
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default dashboard
