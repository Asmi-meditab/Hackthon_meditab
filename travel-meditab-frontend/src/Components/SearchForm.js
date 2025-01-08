import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { useSelector } from 'react-redux';
const SearchForm = () => {
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [purpose, setPurpose] = useState(''); // New state for purpose
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (destination && checkInDate && checkOutDate && purpose) {
      // Prepare the data to be sent in the POST request
      const formData = {
        destination,
        checkInDate: checkInDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        checkOutDate: checkOutDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        purpose,
        username
      };
      const travelData = {
        employeeName: username || "Unknown Employee", // Use the username from Redux or fallback
        travelDates: {
          from: checkInDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
          to: checkOutDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        },
        destination: destination,
        purpose: purpose,
        status: "Pending", // Default status
      };

      try {
        // Send the form data to the backend via POST request
        console.log(formData)
        await axios.post('http://localhost:5000/api/dummy-data', [travelData]); // Sending as an array as expected by the backend
        console.log('Data inserted successfully');

        // Optionally, navigate to another page after successful insertion
        navigate('/dataavail', {
          state: formData,
        });
      } catch (error) {
        console.error('Error inserting dummy data:', error);
        alert('Error inserting data. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://cdn.tourradar.com/s3/content-pages/391/438x292/URiwzK.png)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 text-white">
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 bg-opacity-70 p-6 rounded-lg">
          <h2 className="text-3xl text-center font-semibold">Search Your Trip</h2>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-2 w-full px-4 py-2 text-black rounded-md"
              placeholder="Enter destination"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="checkIn" className="block text-sm font-medium">
                Check-In Date
              </label>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                className="mt-2 w-full px-4 py-2 text-black rounded-md"
                placeholderText="Select check-in date"
                dateFormat="yyyy/MM/dd"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="checkOut" className="block text-sm font-medium">
                Check-Out Date
              </label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                className="mt-2 w-full px-4 py-2 text-black rounded-md"
                placeholderText="Select check-out date"
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium">
              Purpose of Trip
            </label>
            <input
              type="text"
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="mt-2 w-full px-4 py-2 text-black rounded-md"
              placeholder="Enter purpose of the trip"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
