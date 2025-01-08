import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DataAvail = () => {
  const locationState = useLocation().state || {};
  const { destination = '', checkInDate, checkOutDate } = locationState;
  const [filteredData, setFilteredData] = useState({ hotels: [], flights: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination || !checkInDate || !checkOutDate) {
      console.log('Missing input data');
      setFilteredData({ hotels: [], flights: [] });
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/locations_data.json'); // Fetch JSON file from public folder
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Search for location data
        const location = data.locations.find((loc) => {
          const normalizedInput = destination.trim().toLowerCase();
          const normalizedDestination = loc.destination.trim().toLowerCase();
          return normalizedDestination.includes(normalizedInput);
        });

        if (location) {
          const availableHotels = location.hotels.filter((hotel) =>
            hotel.availability.includes(checkInDate)
          );

          const availableFlights = location.flights.filter((flight) => {
            const flightDate = new Date(flight.departure).toISOString().split('T')[0];
            return flightDate >= checkInDate && flightDate <= checkOutDate;
          });

          setFilteredData({ hotels: availableHotels, flights: availableFlights });
        } else {
          console.log('No matching location found.');
          setFilteredData({ hotels: [], flights: [] });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setFilteredData({ hotels: [], flights: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [destination, checkInDate, checkOutDate]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Available Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.hotels.length > 0
          ? filteredData.hotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold">{hotel.name}</h2>
                <p>Rating: {hotel.rating}</p>
                <p>Price per Night: ${hotel.pricePerNight}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Book Now</button>
              </div>
            ))
          : <p className="text-center text-gray-600">No hotels available for the selected destination and dates.</p>}

        {filteredData.flights.length > 0
          ? filteredData.flights.map((flight, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold">{flight.airline}</h2>
                <p>Price: ${flight.price}</p>
                <p>Departure: {new Date(flight.departure).toLocaleString()}</p>
                <p>Arrival: {new Date(flight.arrival).toLocaleString()}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Book Now</button>
              </div>
            ))
          : <p className="text-center text-gray-600">No flights available for the selected destination and dates.</p>}
      </div>
    </div>
  );
};

export default DataAvail;