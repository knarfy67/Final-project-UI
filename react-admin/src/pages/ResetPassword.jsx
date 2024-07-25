import React, { useState } from 'react'
import axios from 'axios';
import Occ from '../img/OCC_LOGO.png'
import people from '../img/students.jpg';
import { Link } from 'react-router-dom';




function ResetPassword() {
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageJson, setmessageJson] = useState(false);
    const [messagePassword, setMessagePassword] = useState(false);
    let dataString = localStorage.getItem("data");
    let { email, token } = JSON.parse(dataString);

  
    
    const messagePasswordShow = messagePassword?  (<div className='bg-red-600 rounded my-2'><h1 className='text-white ml-2 p-2 '>Password dont match</h1></div>) : null;                    
    const messageSuccess = messageJson?  (<div className='bg-green-600 rounded my-2'><h1 className='text-white ml-2 p-2 '>{message} <Link to="/login" className="poppins-semibold">Click here to login page</Link></h1></div>) : null;
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
      

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(email)
        console.log(token)
        console.log(password);
        console.log(passwordConfirm);
        setLoading(true);
        if(password === passwordConfirm ){
          try {
      
            const response = await axios.get(`http://localhost:8000/api/reset-password?email=${email}&password=${password}&password_confirmation=${passwordConfirm}&token=${token}`);
            console.log(response);
             setMessage(response.data.message);
             setmessageJson(true)
            setLoading(false);
        } catch (error) {
            if (error.response) {
                setLoading(false);
                setErrors(error.response)
                console.log(error.response);
            } 
        }
        }
        else{
          setMessagePassword(true);
          setLoading(false);
                console.log(error.response);
        }
    }   
  return (
    <div className='max-w-6xl mx-auto'>
        <div className="flex justify-center items-center h-screen poppins-regular">
    <div className=" bg-slate-100 rounded-lg grid grid-cols-2 gap-6 rounded-3xl">
        <div className='col-span-1 flex flex-col justify-center mx-6'>
            <div className='flex justify-center items-center'>
                <img src={Occ} className='size-44 mt-2' alt="logo" />
            </div>
            {messagePasswordShow}
             {messageSuccess}
            <h1 className="mb-4 mt-4 poppins-regular text-xl">Admin Reset Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input 
                    type="password" 
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <input 
                    type="password" 
                    placeholder='Enter Password'
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)} 
                    className="p-2 border rounded-md"
                />
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

export default ResetPassword