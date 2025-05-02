import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { url } from "../constant";
import { toast } from "react-toastify";

const ApplyDoctorForm = () => {
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
    timings: {
      start: "",
      end: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "start" || name === "end") {
      setFormData({
        ...formData,
        timings: {
          ...formData.timings,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    try{
      dispatch(showLoading());
      const res = await axios.post(`${url}/users/apply-doctor`, {
        ...formData,
        userId: user._id,
      },
      {
        withCredentials: true, // Ensure cookies are sent/stored
      });
      console.log("response: ",res.data);
      
      dispatch(hideLoading());
      if(res.data.success){
        toast.success("Doctor application submitted successfully!")
        navigate("/");
      } else {
        toast.error(res.data.message)
      }
    } catch(error) {
      dispatch(hideLoading());
      console.log("Error while handling form data: ", error);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto bg-white p-6 rounded shadow space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Doctor Application Form
        </h2>
        <div className="text-xl mt-5">Personal Details:</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="text-xl">Professional Details:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Specialization *</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Experience *</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Fees (INR) *</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Timings *</label>
            <div className="flex gap-4">
              <input
                type="time"
                name="start"
                value={formData.timings.start}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="time"
                name="end"
                value={formData.timings.end}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-amber-950 !text-white px-6 py-2 rounded hover:bg-amber-900"
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default ApplyDoctorForm;
