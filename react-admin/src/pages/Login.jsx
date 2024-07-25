import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Occ from '../img/OCC_LOGO.png'
import people from '../img/students.jpg';



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const errorShow = show?  (<div className='bg-red-600 rounded my-2'><h1 className='text-white ml-2 p-2 '>{message}</h1></div>) : null;
    const buttonShow = loading ? (
        <button 
          className="bg-blue-500 text-white p-3 rounded-3xl hover:bg-blue-600 relative flex items-center justify-center"
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
          className="bg-blue-500 text-white p-3 rounded-3xl hover:bg-blue-600 flex items-center justify-center"
          style={{ marginBottom: '20px' }}
        >
          Submit
        </button>
      );


    const handleLogin = async(event) => {
        event.preventDefault();
        setShow(false);
        setLoading(true);
        try{
          const response =  await axios.post('http://localhost:8000/api/admin/login', {email, password});
           localStorage.setItem("authToken", response.data.token)
           localStorage.setItem("authAdmin", JSON.stringify(response.data.admin))
           navigate("/dashboard");
        }catch(error){
            setMessage(error.response.data.message);
            setShow(true)
            setLoading(false);
        }
    }   
  return (
    <div className='max-w-6xl mx-auto'>
        <div className="flex justify-center items-center h-screen poppins-regular">
        <div className="bg-slate-100 rounded-lg grid grid-cols-2 gap-6 rounded-3xl">
        <div className='col-span-1 flex flex-col justify-center mx-6'>
            <div className='flex justify-center items-center'>
                <img src={Occ} className='size-44 mt-2' alt="logo" />
            </div>
            { errorShow }
            <h1 className="mb-4 poppins-regular text-xl">Admin Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <input 
                    type="email" 
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <input 
                    type="password" 
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <div className='flex flex-row-reverse'>
                  <Link to="/forget-password" className='text-lg text-red-700'>Forgot Password</Link>
                </div>
                <div className='flex justify-end gap-2'  style={{ marginTop: '50px' }}>
                <p className=''>Don`t have an account?</p>
                <Link to="/register" className='poppins-medium text-green-700'>Register</Link>
                </div>
                
                {buttonShow}
            </form>
        </div>
        <div className='col-span-1 relative'>
        <h1 className='z-20 text-white absolute mt-16 ml-10 poppins-regular text-2xl'>For Better Tommorow</h1>
    <img src={people} className='h-full relative z-10' alt="people" />
</div>
    </div>
</div>

    </div>
  ) 
}

export default Login