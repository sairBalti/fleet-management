import { useState } from "react";
import logo from "../assets/logoimg.png"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [role, setRole] = useState("Manager");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const handleLogin = async(e) =>{
    e.preventDefault();
    setError("");
    try{
      const response = await axios.post("http://localhost:5000/api/login", {email, password});
      if(response.data.token){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }

    }catch(err){
      setError("Invalid email or password")
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[1000px] h-[700px] bg-white rounded-lg shadow-md  flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-cabs-blue text-white p-10">
          <div className="flex">
          <img src={logo} alt="Logo" className="h-20 mb-4" />
          <h2 className="text-xl font-bold mt-4 font-sans">FreshFold</h2>
          </div>
          
          <h2 className="text-2xl font-bold">Fleet Management System</h2>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lectus viverra non fringilla lobortis dignissim lorem enim.
          </p>
          <img src="/fleet-dashboard.png" alt="Dashboard" className="mt-6" />
        </div>

        {/* Right Section - Login Form */}
        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <div className="rounded-lg shadow-md bg-white w-[87%] h-[70%] ">
          <div className="flex flex-col items-center justify-center text-center mt-5" >
              <h2 className="text-2xl font-bold text-gray-800">Login</h2>
              <p className="text-sm text-gray-700 font-bold mt-2" >Welcome back! Please enter your details</p>
        
             {/* Role Selection */}
            <div className="flex justify-center mt-8 space-x-4 w-full">
                <button 
                      className={`w-32 py-2 text-sm font-medium rounded-md ${role === "Driver" ? "bg-gray-200" : " border border-gray-300"}`}
                        onClick={() => setRole("Driver")}
                >
                Driver
                </button>
            <button 
              className={`w-32 py-2 text-sm font-medium rounded-md ${role === "Manager" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setRole("Manager")}
            >
              Manager
            </button>
          </div>
          </div>
              
          {/* Email Field */}
          <div className="flex flex-col items-center justify-center py-4 ">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <form onSubmit={handleLogin}>
            <div className="mt-4 w-80 mx-auto">
              <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required

              />
            </div>
            {/* Password Field */}
          <div className="mt-4 w-80 mx-auto">
            <label className="text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
              />
              <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">👁️</span>
            </div>
          </div>
          {/* Remember Me & Forgot Password */}
          <div className="mt-3 w-80 flex justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-1" />
              Remember Me
            </label>
            <u><a href="#" className="text-blue-600 text-sm">Forgot Password?</a></u>
          </div>
           {/* Login Button */}
           <button className="w-[75%] mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Login
          </button>
          </form>
          {/* Signup Link */}
          <div className="self-start mt-3 ml-14">
            <p className="text-sm">
              Don't have an account? <a href="#" className="text-blue-600">Sign Up</a>
            </p>

          </div>
         
            
          </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
