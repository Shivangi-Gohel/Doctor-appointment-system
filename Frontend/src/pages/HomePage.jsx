import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import DoctorList from '../components/DoctorList';

function HomePage() {
  const [doctors, setDoctors] = useState("");

  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/getAllDoctor", {
        withCredentials: true,
      });
      
      if (res.data.success) {
        setDoctors(res.data.data);
      } 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <Layout>
        <h1 className='text-center'>Home Page</h1>
        <div className='row'>
          {doctors && doctors.map((doctor) => {
            return <DoctorList doctor={doctor}/>
          })}
        </div>
      </Layout>
    </div>
  )
}

export default HomePage
