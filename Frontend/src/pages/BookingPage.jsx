import React, { useState, useEffect, use } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [available, setAvailable] = useState();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/doctors/getDoctorById",
        { doctorId: params.doctorId },
        {
          withCredentials: true,
        }
      );
      console.log("Res...", res.data);

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user.user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: {
            start: startTime,
            end: endTime,
          },
        },
        {
          withCredentials: true,
        }
      ); 
      dispatch(hideLoading());

      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>Booking Page</h1>
      <div className="container">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstname} {doctors.lastname}
            </h4>
            <h4>Fees: {doctors.fees}</h4>
            <h4>
              Timings: {doctors?.timings?.start} - {doctors?.timings?.end}
            </h4>
            <input type="date" className="border w-[50%] rounded p-2" onChange={(e) => setDate(e.target.value)} />
            <div className="md:col-span-2 w-[50%] mt-3 mb-3">
              <div className="flex gap-4">
                <input
                  type="time"
                  name="start"
                  placeholder="start time"
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="time"
                  name="end"
                  placeholder="end time"
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <input type="button" value="Check Availability" className="justify-center bg-amber-950 w-[50%] !text-white p-2 rounded" /><br />
            <input type="button" value="Book Now" className="justify-center bg-emerald-800 w-[50%] !text-white p-2 rounded !mt-3" onClick={handleBooking} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
