import React, {useEffect, useState} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios'; 
import Occ from '../img/OCC_LOGO.png'
import { FaHome } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";

const EvaluateUpdate = () => {
   const [fetchStudent, setFetchStudent] = useState({});
   const [data, setData] = useState([])
   const { student_id } = useParams();
   const navigate = useNavigate();
   const [status, setStatus] = useState('not');
   const [message, setMessage] = useState(""); 
   const [complianceItems, setComplianceItems] = useState({
    BarangayClearance: false,
    MedicalCertificate: false,
    NBI: false,
    TOR: false,
    Form137: false,
    GoodMoral: false,
    Others: ''
});

const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;
  setComplianceItems(prevState => ({
    ...prevState,
    [name]: checked
  }));
};



const handleOthersInputChange = (e) => {
  const { value } = e.target;
  setComplianceItems(prevState => ({
      ...prevState,
      Others: value 
  }));
};

const adminString = localStorage.getItem("authAdmin");
  const admin = JSON.parse(adminString);
  const {fname, lname , file} = admin




// const parsedStudentId = parseInt(student_id);
const handleFormSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  
  try {
    const response = await axios.post('http://localhost:8000/api/staff/students-update-requirement', {
      id: fetchStudent.requirement.id ,
      status: status,
      requirements: complianceItems
    });
    setData(response.data)
    setStatus('not')
    setMessage("successfully Updated")
    setComplianceItems({BarangayClearance: false,
      MedicalCertificate: false,
      NBI: false,
      TOR: false,
      Form137: false,
      GoodMoral: false,
      Others: ''});

} catch (error) {
    console.error('Error creating staff requirement:', error);
}
  
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/staff/students-requirement');
      const students = response.data;
      console.log(students);
      console.log(student_id)
      const matchedStudent = students.find(student => student.students_id == student_id);
      if (matchedStudent) {
        setStatus(matchedStudent.requirement.status )
        setComplianceItems(matchedStudent.requirement.requirements)
        console.log(matchedStudent.requirement.requirements)
        console.log("Student found:", matchedStudent);
        setFetchStudent(matchedStudent)
      } else {
        console.log("Student not found");
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  fetchData();
}, []);
  
  
const handleLogout = async() => {
    localStorage.clear("authToken");
    localStorage.clear("authAdmin");
}

const handleUpdate = (id) => {
  navigate(`/edit-student/${id}`)
}


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
    <div className='flex justify-center mx-4 gap-8'>
      <div>
      <Link to="/dashboard"><div className='flex items-center ml mt-10'>
                     <IoMdArrowRoundBack />
                    <p className=''> Back</p>
                    </div> </Link>
        <h1 className="poppins-semibold text-2xl text-black text-center my-10">Evaluate Student</h1>
        <div className='bg-white rounded-xl  overflow-y-auto mb-5'  style={{ maxHeight: 'calc(100vh - 64px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }} >
        <div className="">
    <div className='flex flex-col mx-8 gap-10 mt-5  pb-4'>
    {message &&  (<div className='bg-lime-600 rounded my-2'><h1 className='text-white ml-2 p-2 '>{message}</h1></div>)}
      <div className='mt-2'>
      {fetchStudent && fetchStudent.student && (
  <div className='flex flex-row my-2 poppins-regular mx-5'>
    <div>
    {fetchStudent.student.file && (
        <img
          src={`http://localhost:8000/${fetchStudent.student.file}`}
          alt="student picture"
          className='rounded-full h-20 w-20 object-cover mr-5'
        />
      )}
    </div>
    <div>
      <p>ID Number: {fetchStudent.student.id_number}</p>
      <p>Name: {fetchStudent.student.fname} {fetchStudent.student.lname}</p>
      <p>Course and year: {fetchStudent.student.student}</p>
      <p>Course and year: {fetchStudent.requirement.student}</p>
    </div>
  </div>
)}
</div>
    <div className='gap-2 flex flex-col '>
    <form onSubmit={handleFormSubmit}>
            <fieldset>
            <input
                type='checkbox'
                checked={status === 'done'} 
                onChange={(e) => setStatus(e.target.checked ? 'done' : 'not')} 
            /><span className='ml-1 poppins-medium text-lime-600 text-lg mb-6'>Done All Requirements</span> <br />
            {Object.entries(complianceItems).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <input
                            type='checkbox'
                            name={key}
                            checked={value}
                            onChange={handleCheckboxChange}
                          />{' '}
                          {key} <br />
                        </React.Fragment>
                      ))}
            </fieldset>
            <textarea 
  type="text"
  className='border p-2 rounded-md my-3'
  placeholder="Others to comply"
  value={complianceItems.Others ?? ''} 
  onChange={handleOthersInputChange}
/>


            <button type="submit" className="mx-5 border border-blue-700 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition duration-200">Submit</button>
        </form>
    </div>
  </div>

      </div>
    </div>
      </div>
    </div>
</div>
</div>

  )
}

export default EvaluateUpdate