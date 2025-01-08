import React, { useState } from "react";
import { toast } from "react-hot-toast"; // Import toast
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 

const SignUpPage = () => {
  // States for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate(); // Initialize the navigate function
  const dispatch = useDispatch();

  const handleLoginRedirect = () => {
    navigate("/"); // Navigate to the login page ("/" is the login route)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields!");
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    // If everything is correct, show success toast
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Account created successfully!");
        
        navigate("/login"); // Redirect to login after successful registration
      } else {
        toast.error(data.message || "Error registering user");
      }
    } catch (error) {
      toast.error("Error registering user");
      console.error(error);
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Left Side: Image */}
      <div className="w-1/2 bg-gray-200 flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4O4vh3PHyvlX8QKlq6RbSY8G7hLfc30nOQRRZt46RIAkwa_7ruZoDikpIhtjZDrRq6rw&usqp=CAU"
          alt="Signup Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div className="w-96 p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-600 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
                required
              />
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Confirm your password"
                required
              />
</div>

{/* Role Dropdown */}
<div className="mb-6">
  <label
    htmlFor="role"
    className="block text-gray-600 font-medium mb-2"
  >
    Select Role
  </label>
  <select
    id="role"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="employee">Employee</option>
    <option value="admin">Admin</option>
  </select>
</div>

{/* Submit Button */}
<button
  type="submit"
  className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
  onClick={handleLoginRedirect}
>
  Sign Up
</button>
</form>

{/* Already have an account */}
<div className="mt-4 text-center">
<p className="text-gray-600">
  Already have an account?{" "}
  <a
    href="/login"
    className="text-indigo-600 hover:text-indigo-700 font-semibold"
  >
    Login here
  </a>
</p>
</div>
</div>
</div>
</div>
);
};

export default SignUpPage;