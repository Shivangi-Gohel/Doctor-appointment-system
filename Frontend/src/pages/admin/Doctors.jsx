import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'


const Doctors = () => {

  const [doctors, setDoctors] = useState([])

  const getDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/admin/getAllDoctors', {
        withCredentials: true,
      });
      console.log("response ",res.data);
      
      if (res.data.success) {
        setDoctors(res.data.data)
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
      console.log(error.response.data);
      
    }
  }

  const handleAccountStatus = async (doctorId, status) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/admin/changeAccountStatus', {
        doctorId,
        status
      }, {
        withCredentials: true,
      });
      console.log("response ",res.data);
      
      if (res.data.success) {
        alert(res.data.message)
        getDoctors()
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
      console.log(error.response.data);
      
    }
  }

  useEffect(() => {
    getDoctors()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstname',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          {record.status === 'pending' ? (
            <button className='text-center ml-2 bg-green-500 p-2 rounded text-black' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button>
          ) : (
            <button className='text-center ml-2 bg-red-500 p-2 rounded text-black'>Reject</button>
          )}
        </div>
      ),
    }
  ]

  return (
    <Layout>
        <h1>All Doctors</h1>
        <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default Doctors
