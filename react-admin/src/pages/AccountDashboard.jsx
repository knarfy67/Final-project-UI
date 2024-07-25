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


const AccountDashboard = () => {
  const [mergedData, setMergedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  const adminString = localStorage.getItem("authAdmin");
  const admin = JSON.parse(adminString);
  const {fname, lname} = admin


  useEffect(() => {
    const fetchData = async () => {
      try {

        const studentResponse = await axios.get('http://localhost:8000/api/student/show-student');
        const studentData = studentResponse.data;
        
        const staffResponse = await axios.get('http://localhost:8000/api/staff/show-staff');
        const staffData = staffResponse.data;

        const mergedData = [...studentData, ...staffData];
        
        mergedData.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));

        setMergedData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

const handleLogout = async() => {
    localStorage.clear("authToken");
    localStorage.clear("authAdmin");
}

const filteredData = mergedData.filter(item =>
  `${item.fname} ${item.lname} ${item.id_number} ${item.student}`.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className='grid grid-cols-6 mt-3 mx-2'>
    <div className='col-span-1 sticky top-0 z-50'>
    <div className='flex flex-col justify-center items-center'>
      <img src={Occ} className='size-16' alt="logo" />
      <RxAvatar className='mt-5 size-24' />
      <h1 className='text-xl poppins-medium'>{fname} {lname}</h1>
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
  <div className='max-w-screen-lg w-full flex justify-between mx-auto'>
  <Link to="/create-staff">
  <div className='bg-yellow-400 p-16 rounded-lg mt-10 ml-10 hover:scale-105 transition duration-300'>
    <h1 className="poppins-semibold text-lg text-center text-white">Create Staff Account</h1>
  </div>
</Link>
<Link to="/create-student">
  <div className='bg-sky-700 p-16 rounded-lg mt-10 ml-10 hover:scale-105 transition duration-300'>
    <h1 className="poppins-semibold text-lg text-center text-white">Create Student Account</h1>
  </div>
</Link>
  </div>
  
  <div className="mx-6 mt-10">
    <div className='flex justify-between'>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Accounts Created</h1>
    <div className=''>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search by Name or ID Number'
            className='w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
          </div>
    </div>
  
  
  <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-5" style={{ maxHeight: 'calc(100vh - 64px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            picture
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID Number
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Role
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created At
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredData.slice().reverse().map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <img
          src={`http://localhost:8000/${item.file}`}
          alt="student picture"
          className='rounded-full h-20 w-20 object-cover'
        /></td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.fname} {item.lname}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id_number}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.staff} {item.student}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(item.created_at).format('YYYY-MM-DD')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
</div>

  )
}

export default AccountDashboard