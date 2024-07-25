import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import Occ from '../img/OCC_LOGO.png'
import { RxAvatar } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import BarChart from '../chart/Bar'
import LineChart from '../chart/Line'
import moment from 'moment';



const DashBoard = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [searchTermStaff, setSearchTermStaff] = useState('');
   const [fetchStudent, setFetchStudent] = useState([]);
   const [fetchStaff, setFetchStaff] = useState([]);
   const [userData, setUserData] = useState({
    labels: [],
    datasets: [{
      label: "Staff Accounts Created",
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      data: [],
    }]
  });
  const [userDataStudent, setUserDataStudent] = useState({
    labels: [],
    datasets: [{
      label: "Staff Accounts Created",
      data: [],
    }]
  });
   
  const adminString = localStorage.getItem("authAdmin");
  const admin = JSON.parse(adminString);
  const {fname, lname} = admin

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/student/show-student');
        setFetchStudent(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/staff/show-staff');
        setFetchStaff(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };
  
    fetchData()
    fetchData2()
  }, []); 

  useEffect(() => {
    
    const studentCountByDay = fetchStudent.reduce((acc, staff) => {
      const date = moment(staff.created_at).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});


    const staffCountByDay = fetchStaff.reduce((acc, staff) => {
      const date = moment(staff.created_at).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

   const labels = Object.keys(staffCountByDay);
   const data = Object.values(staffCountByDay);

    const labelStudent = Object.keys(studentCountByDay);
    const dataStudent = Object.values(studentCountByDay);

    setUserData({
      labels: labels, 
      datasets: [{
        label: "Staff Accounts Created",
        data: data
      }]
    });

    setUserDataStudent({
      labels: labelStudent,
      datasets: [{
        label: "Student Accounts Created",
        data: dataStudent
      }]
    });
  }, [fetchStudent, fetchStaff]);
 
  const handleUpdate = (id) => {
    navigate(`/edit-student/${id}`)
  }
 
  const handleUpdateStaff = (id) => {
    navigate(`/edit-staff/${id}`)
  }
 
const navigate = useNavigate();

const handleLogout = async() => {
    localStorage.clear("authToken");
    localStorage.clear("authAdmin");
}

const handleDeleteStaff = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/staff/delete-staff/${id}`);
    setFetchStaff(fetchStaff.filter((staff) => staff.id !== id));
  } catch (error) {
    console.error('Error deleting item:', error);
  
  }
}

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/student/delete-student/${id}`);
    setFetchStudent(fetchStudent.filter((student) => student.id !== id));
  } catch (error) {
    console.error('Error deleting item:', error);
  
  }
}


const filteredData = fetchStudent.filter(item =>
  `${item.fname} ${item.lname} ${item.id_number} ${item.student}`.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredDataStaff = fetchStaff.filter(item =>
  `${item.fname} ${item.lname} ${item.id_number} ${item.staff}`.toLowerCase().includes(searchTermStaff.toLowerCase())
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
  <div className='col-span-5 bg-sky-100 rounded-3xl min-h-screen overflow-y-auto' style={{ maxHeight: 'calc(100vh - 64px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
  <h1 className="poppins-semibold text-2xl text-black text-center mt-5">All Accounts</h1>
    <div className='mt-8 gap-10 flex justify-between mx-12'>
      <div className='w-1/2'>
        <BarChart chartData={userData} />
      </div>
      <div className='w-1/2'>
        <LineChart chartData={userDataStudent} />
      </div>
    </div>
    <div className='flex justify-between mx-4 gap-8'>
      <div>
        <h1 className="poppins-semibold text-2xl text-black text-center my-10">Staff Accounts</h1>
        <div className=''>
          <input
            type='text'
            value={searchTermStaff}
            onChange={e => setSearchTermStaff(e.target.value)}
            placeholder='Search'
            className='w-1/2 mb-5 px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
          </div>
        <div className='bg-white rounded-xl overflow-y-auto mb-5'  style={{ maxHeight: 'calc(100vh - 64px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
        <div className="">
        {filteredDataStaff.slice().reverse().map(staff => (
    <div key={staff.id} className='flex justify-between mx-8 gap-10 mt-5 hover:scale-110 transition-transform duration-200 shadow-lg pb-4'>
    <div className='flex'>
      <div className='mt-2'>
        <img
          src={`http://localhost:8000/${staff.file}`}
          alt="staff picture"
          className='rounded-full h-20 w-20 object-cover'
        />
      </div>
      <div className='flex flex-col mt-2 ml-2'>
        <h1 className="poppins-medium text-lg text-black">{staff.fname} {staff.lname}</h1>
        <p>{staff.staff}</p>
        <p>{staff.id_number}</p>
      </div> 
    </div>
    <div className='mt-2 flex gap-2'>
      <button onClick={()=> handleUpdateStaff(staff.id)} className="border border-blue-700 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition duration-200">update</button>
      <button onClick={() => handleDeleteStaff(staff.id)} className="border border-red-700 text-red-700 px-3 py-1 rounded-lg hover:bg-red-700 hover:text-white transition duration-200">delete</button>
    </div>
  </div>
))}

      </div>
    </div>
      </div>
      <div>
        <h1 className="poppins-semibold text-2xl text-black text-center my-10">Student Accounts</h1>
        <div className=''>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search'
            className='w-1/2 mb-5 px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
          </div>
        <div className='bg-white rounded-xl overflow-y-auto mb-5'  style={{ maxHeight: 'calc(100vh - 64px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
        <div className="">
        {filteredData.slice().reverse().map(student => (
    <div key={student.id} className='flex justify-between mx-8 gap-10 mt-5 hover:scale-110 transition-transform duration-200 shadow-lg pb-4'>
    <div className='flex'>
      <div className='mt-2'>
        <img
          src={`http://localhost:8000/${student.file}`}
          alt="student picture"
          className='rounded-full h-20 w-20 object-cover'
        />
      </div>
      <div className='flex flex-col mt-2 ml-2'>
        <h1 className="poppins-medium text-lg text-black">{student.fname} {student.lname}</h1>
        <p>{student.student}</p>
        <p>{student.id_number}</p>
      </div> 
    </div>
    <div className='mt-2 flex gap-2'>
      <button onClick={()=> handleUpdate(student.id)} className="border border-blue-700 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition duration-200">update</button>
      <button onClick={() => handleDelete(student.id)} className="border border-red-700 text-red-700 px-3 py-1 rounded-lg hover:bg-red-700 hover:text-white transition duration-200">delete</button>
    </div>
  </div>
))}

      </div>
    </div>
      </div>
    </div>
</div>
</div>

  )
}

export default DashBoard