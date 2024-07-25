import React from 'react'
import Occ from '../img/OCC_LOGO.png'
import { Link } from 'react-router-dom';

function Home() {
    const user = localStorage.getItem("authToken");
  return (
    <div><nav className="bg-blue-500 p-2">
    <div className="container mx-auto flex justify-between items-center"> 
        <div className="text-white text-xl font-semibold">
          <img src={Occ} className='size-16' alt="logo" />
        </div>
        <ul className="flex space-x-4 gap-3">
            <li>
                <a href="#" className="text-white text-lg poppins-regular hover:text-gray-200">
                    Home
                </a>
            </li>
            <li>
                <a href="#" className="text-white text-lg poppins-regular hover:text-gray-200">
                    About
                </a>
            </li>
            <li>
                <a href="" className="text-white text-lg poppins-regular hover:text-gray-200">
                    Services
                </a>
            </li>
            { user? <li>
        <Link to="/dashboard" className="bg-blue-500 text-white text-lg px-2 py-2 rounded poppins-medium 
                       hover:bg-blue-600 border-white border border-transparent 
                       transition duration-150 ease-in-out">
           Dashboard
       </Link>
        </li> : <li>
        <Link to="/login" className="bg-blue-500 text-white text-lg px-2 py-2 rounded poppins-medium 
                       hover:bg-blue-600 border-white border border-transparent 
                       transition duration-150 ease-in-out">
           Login
       </Link>
        </li> }
            

        </ul>
    </div>
</nav>
</div>
  )
}

export default Home;