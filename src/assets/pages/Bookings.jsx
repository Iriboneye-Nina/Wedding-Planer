import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { SiSanfranciscomunicipalrailway } from "react-icons/si";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    Fullname: '',
    email: '',
    phone: '',
    date: '',
    category: 'Hall', // Ensure this is correctly set
    serviceName: '6658603fe51bc7f2c4908202', // Ensure this is a valid ID
    paymentMethod: 'Mobile Money', // Default payment method
  });
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const isFormValid = () => {
    return (
      formData.Fullname !== '' &&
      formData.email !== '' &&
      formData.phone !== '' &&
      formData.date !== '' &&
      formData.serviceName !== '' // Ensure serviceName is not empty
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        console.log('Form Data:', formData); // Log the form data for debugging

        const response = await axios.post(
          'https://dream-day-rentals-16.onrender.com/weeding/booking/add',
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        console.log('Response:', response.data);
        setMessage('Booking successful!');

        // Navigate to a different page after successful booking
        navigate('/success'); // Change '/success' to your desired route
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setMessage('Booking failed. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleToggleImage = () => {
    setShowSecondImage(!showSecondImage);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4">
      <div className="md:w-3/5 w-full p-4 border border-gray-300 rounded-xl mt-10 md:mr-5">
        <img src={showSecondImage ? "des6.jpg" : "/des9.jpg"} alt="Hall" className="h-64 md:h-80 w-full rounded-xl object-cover"/>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Luxurious Event Hall</h2>
          <h1 className="flex items-center mt-2"><FaLocationDot className="mr-2" /> Kigali city</h1>
          <div className="flex flex-col md:flex-row justify-between mt-2">
            <p className="text-sm text-gray-600 flex items-center mb-2 md:mb-0"><FaLocationDot className="mr-2" /> Convention centre, Central Plaza</p>
            <p className="text-sm text-gray-600 flex items-center mb-2 md:mb-0"><GoPeople className="mr-2" /> 200 per/people</p>
            <p className="text-sm text-gray-600 flex items-center"><SiSanfranciscomunicipalrailway className="mr-2" /> Renting Cost: $5000/day</p>
          </div>
          <button onClick={handleToggleImage} className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 mt-4">More About</button>
          <h1 className="mt-4">Description</h1>
          <p className="mt-2 text-sm text-gray-700">This luxurious event hall situated in the heart of the city offers a sophisticated venue for various occasions. With its modern amenities and spacious layout, it can accommodate up to 200 guests comfortably. Perfect for weddings, corporate events, and other special occasions.</p>
        </div>
      </div>
      <div className="md:w-2/5 w-full p-4 mt-10 md:ml-5 border border-gray-300 rounded-xl">
        <h2 className="text-2xl font-semibold text-center">Information</h2>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label htmlFor="Fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="Fullname" name="Fullname" required value={formData.Fullname} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Tel</label>
            <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
            <input type="date" id="date" name="date" required value={formData.date} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 w-full" />
          </div>
          <div className="mb-4 text-center">
            <button type="submit" className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Book Now</button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
