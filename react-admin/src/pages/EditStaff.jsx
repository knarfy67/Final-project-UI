import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SignaturePad from "react-signature-canvas";
import axios from 'axios'; 
import Occ from '../img/OCC_LOGO.png';
import { RxAvatar } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";

const EditStaff = () => {
    const [id_number, setidNumber] = useState("");
    const [staff, setStaff] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState("");
    const [message, setMessage] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const sigCanvas = useRef({});
    const [buttonsVisible, setButtonsVisible] = useState(true);
    const [imageURL, setImageURL] = useState(null);
    const [canvasSaved, setCanvasSaved] = useState(false); 
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/staff/update-staff/${id}`);
            setidNumber(response.data.staff.id_number);
            setStaff(response.data.staff.staff);
            setFname(response.data.staff.fname);
            setLname(response.data.staff.lname);
            setEmail(response.data.staff.email);
            console.log(response.data); 
          } catch (error) {
            console.error('Error fetching student data:', error);
          }
        };
      
        fetchData(); 
      
      }, []); 

    const errorShow = show ? (<div className='bg-green-600 rounded mx-40 mt-5'><h1 className='text-white ml-2 p-2 '>{message}</h1></div>) : null;

    const handleLogout = async() => {
        localStorage.clear("authToken");
        localStorage.clear("authAdmin");
    }

    const clear = () => sigCanvas.current.clear();
    const save = () => { 
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")); 
        setButtonsVisible(false); 
        setCanvasSaved(true);
    } 

    const handleRegister = async(event) => {
        event.preventDefault();
        setShow(false);
        setLoading(true);

        const formData = new FormData()
        formData.append('id_number', id_number)
        formData.append('staff', staff)
        formData.append('fname', fname)
        formData.append('lname', lname)
        formData.append('email', email)
        formData.append('file', file)
        formData.append('imageURL', imageURL);
      
        try {
            const response =  await axios.post(`http://localhost:8000/api/staff/update-staff/${id}`, formData );
            setMessage(response.data.message);
            console.log(response.data.message);
            setLoading(false);
            setShow(true);
            setidNumber("");
            setStaff("");
            setEmail("")
            setFname("")
            setLname("")
            setFile("")
            setImageURL(null)
        } catch(error) {
            setMessage(error.response.data.message);
            setShow(true)
            setLoading(false);
        }
    }   

    const buttonShow = loading ? (
        <button 
            className="ml-40 mt-6 bg-blue-500 text-white p-3 px-28 rounded-3xl hover:bg-blue-600 relative flex items-center justify-center"
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
        <button onClick={handleRegister}
            className="ml-40 mt-6 bg-blue-500 text-white p-3 px-28 rounded-3xl hover:bg-blue-600 flex items-center justify-center"
            style={{ marginBottom: '20px' }}
        >
            Submit
        </button>
    );

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
            <div className='col-span-5 bg-sky-100 rounded-3xl min-h-screen overflow-y-auto' style={{ maxHeight: 'calc(100vh - 64px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <Link to="/accounts-dashboard"><div className='flex items-center ml-36 mt-2'>
                     <IoMdArrowRoundBack />
                    <p className=''> Back</p>
                    </div></Link>
                {errorShow}
                <div className='flex flex-col mx-40 mt-10 gap-4'>
                <h1 className='poppins-semibold text-xl'>Update Staff</h1> 
                <input 
                    type="text" 
                    placeholder='Enter ID number'
                    value={id_number}
                    onChange={(e) => setidNumber(e.target.value)} 
                    className="p-2 border rounded-md"
                />

<select className="p-2 border rounded-md" value={staff} onChange={(e) => setStaff(e.target.value)}>
  <option disabled value="">Select Staff</option>
  <option value="Registrar">Registrar</option>
  <option value="Clinic">Clinic</option>
  <option value="CSG">CSG</option>
  <option value="Billing">Billing</option>
</select>

                <input 
                    type="text" 
                    placeholder='First name'
                    value={fname}
                    onChange={(e) => setFname(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <input 
                    type="text" 
                    placeholder='Last name'
                    value={lname}
                    onChange={(e) => setLname(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <input 
                    type="email" 
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <div>
                    <h1 className='poppins-semibold mt-3' >Upload picture</h1>
                <input 
                   type="file" 
                   accept="image/png, image/gif, image/jpeg"
                   onChange={(e) => setFile(e.target.files[0])} 
                   className="p-2 border rounded-md"
               /> 
                </div>
                
                <div>
                    {imageURL ? (
                        <img src={imageURL} alt="Signature" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                    ) : (
                        <SignaturePad ref={sigCanvas} canvasProps={{className: "signatureCanvas"}} />
                    )}
                    {buttonsVisible && !imageURL ? (
                        <div className='mt-3'>
                            <button className="bg-red-400 text-white p-3 rounded-3xl" onClick={clear}>Clear</button>
                            <button className=" ml-3 bg-green-500 text-white p-3 rounded-3xl" onClick={save}>Save</button>
                        </div>
                    ) : null }
                </div> 
                </div>
                {buttonShow}                
            </div>
        </div>
    );
}

export default EditStaff;
