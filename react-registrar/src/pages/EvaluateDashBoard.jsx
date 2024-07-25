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
import Evaluate from './Evaluate';



const EvaluateDashBoard = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [fetchStudent, setFetchStudent] = useState([]);
   const [mergeData, setmergeData] = useState([]);
   const navigate = useNavigate();
  const [userDataStudent, setUserDataStudent] = useState({
    labels: [],
    datasets: [{
      label: "Staff Accounts Created",
      data: [],
    }]
  });
   
  const adminString = localStorage.getItem("authAdmin");
  const admin = JSON.parse(adminString);
  const {fname, lname , file} = admin

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students requirements data
        const response2 = await axios.get('http://localhost:8000/api/staff/students-requirement');
        const studentRequirements = response2.data;
        const filterRequirementsID = studentRequirements.map(req => req.requirements_id);
        const filterStudentID = studentRequirements.map(student => student.students_id);
        
        console.log('Student requirements:', studentRequirements);
        console.log('Student requirements ID:', filterStudentID);
  
        // Fetch staff requirements data
        const response3 = await axios.get('http://localhost:8000/api/staff/staff-requirement');
        const staffRequirements = response3.data;
        const staffInner = staffRequirements.filter(staff => filterRequirementsID.includes(staff.requirements_id));
        
        // Filter studentInner3 to include only those with requirements_id in staffInner
        const studentInner3 = studentRequirements.filter(student => 
          staffInner.some(staff => staff.requirements_id === student.requirements_id)
        );
  
        // Merging studentInner3 and staffInner based on requirements_id and including students_id
        const mergedDataAll = studentInner3.map(student => {
          return {
            ...student,
            staff: staffInner
              .filter(staff => staff.requirements_id === student.requirements_id)
              .map(staff => ({ ...staff, staff_id: staff.staff_id }))
          };
        });
        
  
        console.log('Student requirements ID condition:', studentInner3);
        console.log('Staff requirements ID condition:', staffInner);
        console.log('All merged data:', mergedDataAll);
        // console.log('All merged data:', mergedDataAll.staff.staff.staff);
  
        setmergeData(mergedDataAll);
  
        // Fetch students data
        const response = await axios.get('http://localhost:8000/api/student/show-student');
        const allStudents = response.data;
        console.log('Students:', allStudents);

        const mergedStudentIDs = mergedDataAll
         .filter(data => data.staff.some(staff => staff?.staff?.staff === 'Registrar'))
        .map(data => data.students_id);

  
        const filteredStudents = allStudents.filter(student => !mergedStudentIDs.includes(student.id));
        console.log('Filtered students:', filteredStudents);
  
        setFetchStudent(filteredStudents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    
    const studentCountByDay = fetchStudent.reduce((acc, staff) => {
      const date = moment(staff.created_at).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});


    const labelStudent = Object.keys(studentCountByDay);
    const dataStudent = Object.values(studentCountByDay);


    setUserDataStudent({
      labels: labelStudent,
      datasets: [{
        label: "Student Accounts Created",
        data: dataStudent
      }]
    });
  }, [fetchStudent]);
 

 
 
const handleLogout = async() => {
    localStorage.clear("authToken");
    localStorage.clear("authAdmin");
}

const handleUpdate = (id) => {
  navigate(`/evaluate-student/${id}`)
}


const filteredData = fetchStudent.filter(item =>
  `${item.fname} ${item.lname} ${item.id_number} ${item.student}`.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className='grid grid-cols-6 mt-3 mx-2'>
  <div className='col-span-1 sticky top-0 z-50'>
    <div className='flex flex-col justify-center items-center'>
      <img src={Occ} className='size-16' alt="logo" />
      <img
          src={`http://localhost:8000/${file}`}
          alt="student picture"
          className='rounded-full size-24 mt-5 object-cover'
        />
      <h1 className='text-xl poppins-medium'>{fname} {lname}</h1>
      <p className='text-xs poppins-regular'>Registrar</p>
    </div>
    <Link to="/dashboard"><div className='mt-10 ml-12 text-base poppins-medium flex flex-row items-end gap-2'>
      <FaHome className='size-5 mb-1'/>
      <h1>Home</h1>
    </div>
    </Link>
    <Link to="/EvaluateDashBoard"><div className='mt-6 ml-12 text-base poppins-medium flex flex-row items-end gap-2'>
      <MdPeople className='size-5 mb-1'/>
      <h1>Evaluate</h1>
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
  <h1 className="poppins-semibold text-2xl text-black text-center my-10">Student Accounts</h1>
    <div className='flex justify-center mx-4 gap-10 mt-10'>
      <div className='w-1/2 h-screen'>
        <BarChart chartData={userDataStudent} />
      </div>
      <div>
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
      <button onClick={()=> handleUpdate(student.id)} className="border border-blue-700 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition duration-200">Evaluate</button>
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

export default EvaluateDashBoard