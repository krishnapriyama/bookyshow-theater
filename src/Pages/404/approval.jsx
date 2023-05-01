import React from 'react'
import { Link } from 'react-router-dom'

const approval = () => {
  return (
   <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
	<h1 class="text-6xl font-bold text-white">Access Deined</h1>
   <h1 className='text-white font-bold text-xl mt-4'>Waiting for Approval</h1>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <Link to="/login">Go Login</Link>
        </span>
      </a>
    </button>
</main>
  )
}

export default approval
