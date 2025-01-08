import React, { useState } from 'react';

// Profile Page Component
const ProfilePage = ({ onProfileChange }) => {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    designation: '',
    department: '',
    profilePicture: null,
  });

  const departments = ['IT', 'Admin', 'QA', 'Developer', 'Automation'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    onProfileChange({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const newProfile = { ...profile, profilePicture: URL.createObjectURL(e.target.files[0]) };
    setProfile(newProfile);
    onProfileChange(newProfile);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="profilePicture" className="mb-2 text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {profile.profilePicture && (
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mt-4 border-2 border-indigo-500"
            />
          )}
        </div>

        {/* Other profile fields here... */}

      </div>
    </div>
  );
};

export default ProfilePage;