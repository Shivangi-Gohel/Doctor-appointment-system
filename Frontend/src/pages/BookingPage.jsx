import React, { useState, useEffect, use } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { url } from "../constant";
import { toast } from "react-toastify";

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
        `${url}/doctors/getDoctorById`,
        { doctorId: params.doctorId },
        {
          withCredentials: true,
        }
      );

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
        `${url}/users/book-appointment`,
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
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      setAvailable(true);
      if (!date && !time) {
        return toast.error("Please select date and time");
      }
      dispatch(showLoading());
      const res = await axios.post(
        `${url}/users/booking-availability`,
        {
          doctorId: params.doctorId,
          date: date,
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
        setAvailable(true);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
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
      <h1 className="text-center text-2xl">Booking Page</h1>

      <div className="flex justify-center p-4">
        <div className="w-full max-w-2xl border rounded-2xl shadow-lg p-6 bg-white">
          {doctors && (
            <div>
              <h4 className="text-2xl font-semibold mb-4">
                Dr. {doctors.firstname} {doctors.lastname}
              </h4>
              <h4 className="text-lg mb-2">Fees: ₹{doctors.fees}</h4>
              <h4 className="text-lg mb-4">
                Timings: {doctors?.timings?.start} - {doctors?.timings?.end}
              </h4>

              <input
                type="date"
                className="border w-full rounded p-2 !mb-3"
                onChange={(e) => {
                  setAvailable(false);
                  setDate(e.target.value);
                }}
              />

              <div className="flex gap-4 mb-4">
                <input
                  type="time"
                  name="start"
                  placeholder="Start time"
                  onChange={(e) => {
                    setAvailable(false);
                    setStartTime(e.target.value);
                  }}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="time"
                  name="end"
                  placeholder="End time"
                  onChange={(e) => {
                    setAvailable(false);
                    setEndTime(e.target.value);
                  }}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <input
                type="button"
                value="Check Availability"
                className="w-full bg-amber-950 !text-white p-2 rounded"
                onClick={handleAvailability}
              />

              {!available && (
                <input
                  type="button"
                  value="Book Now"
                  className="w-full bg-emerald-800 !text-white p-2 rounded !mt-3"
                  onClick={handleBooking}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
