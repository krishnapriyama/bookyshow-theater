import React, { useEffect } from 'react';

function Navbar() {
  return ( 
    <nav className="bg-gray-800 w-full">
      <div className="mx-auto px-4 py-2 max-w-full  flex justify-between items-center">
        <div className="text-white font-bold text-lg">Dashboard</div>
        <ul className="flex">
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300">Home</a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300">Dashboard</a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300">Settings</a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300">Help</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;