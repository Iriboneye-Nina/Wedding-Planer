import React, { useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function RecentHalls() {

  const [booking, setBooking] = useState([]);
  const handleFetch = async()=>{
    await axios({
      method:"Get",
      url:"https://dream-day-rentals-16.onrender.com/weeding/booking/add",
      headers:{
        // "Content-Type":"application/json"
      }
  
    }).then((response)=>{
      console.log(response.data.getBooking);
      setBooking(response.data.getBooking)
    }).catch((error)=>{
      console.error(error);
    })  
  }
  useEffect(()=>{
    handleFetch();
  }, [])
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-md border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium text-xl">Recent Halls</strong>
      <div className="mt-4">
        <table className="w-full text-gray-700 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Vendor ID</th>
              <th className="px-4 py-2">Vendor Name</th>
              <th className="px-4 py-2">Booking Date</th>
              <th className="px-4 py-2">Total Bookings</th>
              <th className="px-4 py-2">Hall Address</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((hall, index) => {
              const bookingDate = new Date(hall.booking_date);
              const formattedDate = isValid(bookingDate) ? format(bookingDate, 'dd MMM yyyy') : 'Invalid date';

              return (
                <tr key={hall.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/vendor/${hall.vendor_id}`} className="text-blue-600 hover:underline">#{hall.id}</Link>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/vendor/${hall.vendor_id}`} className="text-blue-600 hover:underline">#{hall.vendor_id}</Link>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/vendor/${hall.vendor_id}`} className="text-blue-600 hover:underline">{hall.vendor_name}</Link>
                  </td>
                  <td className="border px-4 py-2 text-center">{formattedDate}</td>
                  <td className="border px-4 py-2 text-center">{hall.total_bookings}</td>
                  <td className="border px-4 py-2 text-center">{hall.hall_address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
