import React, { useEffect, useState } from "react";
import axios from "axios";

const TravelList = () => {
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch travel data from backend when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/travel") // Assuming the backend is running on localhost:5000
      .then((response) => {
        setTravels(response.data); // Store fetched data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError("Error fetching travel data");
        setLoading(false);
      });
  }, []);

  // Handle status update
  const updateStatus = (id, newStatus) => {
    axios
      .patch(`http://localhost:5000/api/travel/${id}`, { status: newStatus })
      .then((response) => {
        // Update the local state with the new status
        setTravels((prevTravels) =>
          prevTravels.map((travel) =>
            travel._id === id ? { ...travel, status: newStatus } : travel
          )
        );
        alert("Status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Failed to update status");
      });
  };

  // Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-bold">Loading travel data...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Travel Requests</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Employee Name</th>
              <th className="border border-gray-300 p-2">Destination</th>
              <th className="border border-gray-300 p-2">Purpose</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
              <th className="border border-gray-300 p-2">Travel Dates</th>
            </tr>
          </thead>
          <tbody>
            {travels.map((travel, index) => (
              <tr
                key={travel._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="border border-gray-300 p-2">
                  {travel.employeeName}
                </td>
                <td className="border border-gray-300 p-2">
                  {travel.destination}
                </td>
                <td className="border border-gray-300 p-2">{travel.purpose}</td>
                <td
                  className={`border border-gray-300 p-2 ${
                    travel.status === "Approved"
                      ? "text-green-600"
                      : travel.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {travel.status}
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    className="border border-gray-300 p-1"
                    value={travel.status}
                    onChange={(e) => updateStatus(travel._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(travel.travelDates.from).toLocaleDateString()} -{" "}
                  {new Date(travel.travelDates.to).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TravelList;
