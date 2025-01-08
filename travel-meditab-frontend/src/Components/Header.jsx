import React from "react";
import { FaSearch, FaFilter, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice"; // Import the logout action

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear token
    localStorage.removeItem("authToken"); // Optional: Clear the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Search Bar */}
      <div className="flex items-center w-1/2 space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-lg text-black"
        />
        <FaSearch className="text-xl text-gray-500" />
      </div>

      {/* Filter Button */}
      <div className="ml-4">
        <button className="flex items-center bg-blue-500 text-white p-2 rounded-lg">
          <FaFilter className="mr-2" />
          Filter
        </button>
      </div>

      {/* Profile/Login/Logout Button */}
      <div>
        {token ? (
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <FaUser className="text-2xl cursor-pointer" />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
