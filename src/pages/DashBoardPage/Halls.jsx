import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdUpdate, MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RecentHalls() {
  const [data, setData] = useState([]);
  const params = useParams();

  // Function to fetch data from API
  const handleFetch = async () => {
    try {
      const response = await axios.get("https://dream-day-rentals-16.onrender.com/weeding/service/list");
      console.log(response.data.getServices);
      setData(response.data.getServices);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    handleFetch();
  }, []);

  // Function to handle deletion of a service
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://dream-day-rentals-16.onrender.com/weeding/service/delete/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete service');
    }
  };

  // Function to handle update (placeholder for future implementation)
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`https://dream-day-rentals-16.onrender.com/weeding/service/update/${id}`, {
        // Add the data to be updated here, for example:
        // name: "New Service Name",
        // availability: true,
        // etc.
      });
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update service');
    }
  };

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-md border border-gray-200 flex-1">
      <ToastContainer />
      <strong className="text-gray-700 font-medium text-xl">
        Recent Halls
      </strong>
      <div className="mt-4">
        <table className="w-full text-gray-700 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Service Name</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="border px-4 py-2 text-center">
                  <img src={item.image} alt="Service" />
                </td>
                <td className="border px-4 py-2 text-center">{`${item.availability}`}</td>
                <td className="border px-4 py-2 text-center">{item.category}</td>
                <td className="border px-4 py-2 text-center">{item.description}</td>
                <td className="border px-4 py-2 text-center">{item.email}</td>
                <td className="border px-4 py-2 text-center">{item.location}</td>
                <td className="border px-4 py-2 text-center">{item.phoneNumber}</td>
                <td className="border px-4 py-2 text-center">{item.serviceName}</td>
                <td className="border px-4 py-2 text-center flex flex-row">
                  <MdUpdate onClick={() => handleUpdate(item._id)} />
                  <MdDeleteForever onClick={() => handleDelete(item._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
