import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import axios from 'axios';

Modal.setAppElement('#root'); // Bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

export default function EditServiceModal({ isOpen, onRequestClose, service, onServiceUpdated }) {
  const [formData, setFormData] = useState({
    image: '',
    availability: '',
    category: '',
    description: '',
    email: '',
    location: '',
    phoneNumber: '',
    serviceName: ''
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://dream-day-rentals-16.onrender.com/weeding/service/update/${service._id}`, formData);
      toast.success(response.data.message);
      onServiceUpdated();
      onRequestClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update service');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input type="text" name="image" value={formData.image} onChange={handleChange} />
        </label>
        <label>
          Availability:
          <input type="text" name="availability" value={formData.availability} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <label>
          Service Name:
          <input type="text" name="serviceName" value={formData.serviceName} onChange={handleChange} />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </Modal>
  );
}
