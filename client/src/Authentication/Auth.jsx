import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const[title,setTitle]=useState("Sign Up");
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[input,setInput]=useState('');
    const[success,setSuccess]=useState("");
    const{signUp,signIn}=useAuth();

    const handleSubmit= async ()=>{
      if(title==="Sign Up"){
        const message = await signUp({username,email,password});
        setSuccess(message);
      }
      else if(title==="Sign In"){
        const message =await  signIn({email,password});
        setSuccess(message);
      }

    }
  return (
    <div className='w-full h-screen bg-[#363636] pt-[8rem]'>
        <div className='w-[30rem] h-[30rem] rounded-xl mx-auto shadow-sm shadow-white bg-[#252525]'>
            <p className="flex justify-center pt-6 text-white text-2xl font-semibold">{success}</p>
            <h2 className='flex justify-center pt-6 text-white text-2xl font-semibold'>{title} here</h2>
            <div className='flex flex-col items-center'>
            { title==="Sign Up"?
            <div className='relative'> 
            {
              input==="name" &&<p className='text-[#ffffffe1] absolute z-1 ml-8 leading-8 bg-[#252525] '>Name</p>
            }
            <input type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder={input==="name"?'':'Enter Your Name'} 
            onFocus={()=>setInput("name")}
            onBlur={()=>setInput("")}
            className=' w-[20rem] text-white relative border border-gray-400 focus:border-blue-500 focus:ring-0 mt-4 h-[3rem] rounded-xl pl-4'/>
              </div>
            :""
            }
            
          <div>
              {
              input==="email" &&<p className='text-white transition-all absolute z-1 bg-[#252525] ml-8 leading-8 focus:border-blue-500 focus:ring-0'>Email</p>
            }
             <input type="text"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
              onFocus={()=>setInput("email")}
            onBlur={()=>setInput("")}
            placeholder={input==="email"?'':'Enter Your Email'}
            className='w-[20rem] text-white relative mt-4 h-[3rem] border border-gray-400 focus:border-blue-500 focus:ring-0 rounded-xl pl-4' />
          </div>
          <div>
           {
              input==="password" &&<p className='text-white absolute z-1 bg-[#252525] ml-8 leading-7'>Password</p>
            }
             <input type="text"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
              onFocus={()=>setInput("password")}
            onBlur={()=>setInput("")}
            placeholder={input==="password"?'':'Enter Your Password'}
           className="relative text-white w-[20rem] border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mt-4 h-[3rem] rounded-xl pl-4"/>
           </div>
        <button onClick={()=>handleSubmit()} className='bg-gray-400 text-white font-semibold h-[2rem] rounded-xl w-[20rem] mt-[2rem]'>{title}</button>
            {
              title==="Sign Up"?<p className='mt-4 text-gray-400'>I have already account!<span onClick={()=>setTitle("Sign In")} className='text-gray-50 cursor-pointer'>Sign In</span></p>:
              <p>I don't have account!<span onClick={()=>setTitle("Sign Up")} className='text-gray-50 cursor-pointer'>Sign Up</span></p>
            }
            
            </div>
        </div>

    </div>
  )
}

export default Auth