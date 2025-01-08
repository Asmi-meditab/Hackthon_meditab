import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice"; // Import the login action
import { useSelector } from "react-redux";

const LoginPage = () => {
    // const role = useSelector((state) => state.auth.role); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use the dispatch function to dispatch actions

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Reset error message on submit

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/login", {
  //       email,
  //       password,
  //     });
  //     const{role}=response.data;
  //     console.log("role",role);
  //     if (response.data.token) {
  //       // Save the JWT token in Redux store and localStorage
  //       dispatch(login({ token: response.data.token }));
  //       localStorage.setItem("authToken", response.data.token);
          
  //       // Redirect to the dashboard or home page after successful login
        
  //       if(role==="employee"){
  //           navigate("/SearchForm");
  //       }else{
  //           navigate("/dashboard");
  //     }
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       setError(err.response.data.message || "Login failed");
  //     } else {
  //       setError("Server error");
  //     }
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Reset error message on submit

  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    const { token, role, username } = response.data;
    console.log("role", role);
    if (token) {
      // Save the JWT token and username in Redux store and localStorage
      dispatch(login({ token, username }));
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username); // Optional: store username in localStorage

      // Redirect to the appropriate page based on role
      if (role === "employee") {
        navigate("/SearchForm");
      } else {
        navigate("/dashboard");
      }
    }
  } catch (err) {
    if (err.response) {
      setError(err.response.data.message || "Login failed");
    } else {
      setError("Server error");
    }
  }
};

  return (
    <div className="flex h-screen">
      {/* Left Side: Image */}
      <div className="w-1/2 bg-gray-200 flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4O4vh3PHyvlX8QKlq6RbSY8G7hLfc30nOQRRZt46RIAkwa_7ruZoDikpIhtjZDrRq6rw&usqp=CAU"
          alt="Login Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div className="w-96 p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Login
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Create New Account Option */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
