import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate = useNavigate();
  return (
    <>
    <div className='card' onClick={() => navigate(`/book-appointment/${doctor._id}`)} style={{cursor: "pointer"}}>
        <div className='card-header'>
            Dr. {doctor.firstname} {doctor.lastname}
        </div>
        <div className='card-body'>
            <p>
                <b>Specialization</b> : {doctor.specialization}
            </p>
            <p>
                <b>Experience</b> : {doctor.experience}
            </p>
            <p>
                <b>Fees Per Consultation</b> : {doctor.fees}
            </p>
            <p>
                <b>Timings</b> : {doctor.timings.start} - {doctor.timings.end}
            </p>
        </div>
    </div>
    </>
  )
}

export default DoctorList
