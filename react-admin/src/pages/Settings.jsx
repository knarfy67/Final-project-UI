import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import Occ from '../img/OCC_LOGO.png'
import { RxAvatar } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import moment from 'moment';


const Settings = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
      const adminString = localStorage.getItem("authAdmin");
      const admin = JSON.parse(adminString);
      if (admin) {
          setFname(admin.fname);
          setLname(admin.lname);
          setEmail(admin.email);
      }
  }, []);


  const handleUpdate = async(event) => {
    event.preventDefault();
    setShow(false);
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      setMessage("Passwords do not match");
      setShow(true);
      return;
  }
    try{
        const response =  await axios.post('http://localhost:8000/api/admin/update-admin', { fname, lname, email, password});
        setMessage(response.data.message);
        console.log(response.data.message);
        setLoading(false);
        setShow(true);
        setidNumber("");
        setEmail("")
        setFname("")
        setLname("")
        setPassword("");
        setConfirmPassword("")
    }catch(error){
        console.error("Invalid response format:", response);
        setShow(true)
        setLoading(false);
    }
}   

  const errorShow = show?  (<div className='ml-10 bg-green-600 rounded my-2'><h1 className='text-white ml-2 p-2 '>{message}</h1></div>) : null;
    const buttonShow = loading ? (
        <button 
          className="ml-10 bg-blue-500 text-white p-3 rounded-3xl hover:bg-blue-600 relative flex items-center justify-center"
          style={{ marginBottom: '20px' }}
        >
          <div className="absolute inset-0 flex items-center justify-center mr-10">
            <div className="loader-dots block relative w-6 h-6">
              <div className="absolute top-0 mt-1 w-1.5 h-1.5 rounded-full bg-white"></div>
              <div className="absolute top-0 mt-1 w-1.5 h-1.5 rounded-full bg-white"></div>
              <div className="absolute top-0 mt-1 w-1.5 h-1.5 rounded-full bg-white"></div>
              <div className="absolute top-0 mt-1 w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          </div>
        </button>
      ) : (
        <button 
          className="ml-10 bg-blue-500 text-white p-3 rounded-3xl hover:bg-blue-600 flex items-center justify-center"
          style={{ marginBottom: '20px' }}
        >
          Update
        </button>
      );

const handleLogout = async() => {
    localStorage.clear("authToken");
    localStorage.clear("authAdmin");
}


  return (
    <div className='grid grid-cols-6 mt-3 mx-2'>
    <div className='col-span-1 sticky top-0 z-50'>
    <div className='flex flex-col justify-center items-center'>
      <img src={Occ} className='size-16' alt="logo" />
      <RxAvatar className='mt-5 size-24' />
      <h1 className='text-xl poppins-medium'>Name</h1>
      <p className='text-xs poppins-regular'>Admin</p>
    </div>
    <Link to="/dashboard"><div className='mt-10 ml-12 text-base poppins-medium flex flex-row items-end gap-2'>
      <FaHome className='size-5 mb-1'/>
      <h1>Home</h1>
    </div>
    </Link>
    <Link to="/accounts-dashboard"><div className='mt-6 ml-12 text-base poppins-medium flex flex-row items-end gap-2'>
      <MdPeople className='size-5 mb-1'/>
      <h1>Accounts</h1>
    </div>
    </Link>
    <Link to="/reports"><div className='mt-6 ml-12 text-base poppins-medium flex flex-row items-end gap-2'>
      <HiOutlineDocumentReport  className='size-5 mb-1'/>
      <h1>Reports</h1>
    </div>
    </Link>
    <Link to="/settings"><div className='mt-6 ml-12 text-base poppins-medium flex flex-row items-end gap-2'>
      <IoSettingsSharp className='size-5 mb-1'/>
      <h1>Settings</h1>
    </div>
    </Link>
    <Link onClick={handleLogout} to="/login"><div className='opacity-50 mt-28 ml-11 text-base poppins-medium flex flex-row items-end gap-2 '>
      <IoMdExit className='size-5 mb-1'/>
      <h1>Logout</h1>
    </div>
    </Link>
  </div>
  <div className='col-span-5 bg-sky-100 rounded-3xl min-h-screen overflow-y-auto overflow-y-auto' style={{ maxHeight: 'calc(100vh - 64px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
   <div className='flex'>
   <div className="mx-6 mt-10">
    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Edit Account</h1>
    <RxAvatar className='mt-5 size-80' />  
    </div>
     <div>
            <form onSubmit={handleUpdate} className='flex flex-col gap-6 mt-28' >
            {errorShow}
                <input 
                    type="text" 
                    placeholder='First name'
                    value={fname}
                    onChange={(e) => setFname(e.target.value)} 
                    className="pr-44 ml-10 border rounded-md"
                />
                <input 
                    type="text" 
                    placeholder='Last name'
                    value={lname}
                    onChange={(e) => setLname(e.target.value)} 
                    className="pr-44 ml-10 border rounded-md"
                />
                <input 
                    type="text" 
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="pr-44 ml-10 border rounded-md"
                />
                 <input 
                    type="password" 
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="pr-44 ml-10 border rounded-md"
                />
                 <input 
                    type="password" 
                    placeholder='Re Enter password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="pr-44 ml-10 border rounded-md"
                />
                {buttonShow}
        </form>
    </div>
   </div>
</div>
</div>

  )
}

export default Settings