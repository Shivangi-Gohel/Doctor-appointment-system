import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="w-[300px] p-4 m-4 border rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
        onClick={() => navigate(`/book-appointment/${doctor._id}`)}
      >
        <div className="text-xl font-semibold mb-2">
          Dr. {doctor.firstname} {doctor.lastname}
        </div>
        <div className="space-y-2 text-base">
          <p>
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <hr />
          <p>
            <b>Experience:</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation:</b> ₹{doctor.fees}
          </p>
          <p>
            <b>Timings:</b> {doctor.timings.start} - {doctor.timings.end}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
