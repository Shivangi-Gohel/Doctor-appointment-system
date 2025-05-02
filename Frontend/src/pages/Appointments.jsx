import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from "../components/Layout.jsx"
import { Table } from 'antd'
import { url } from '../constant.js'
const Appointments = () => {

  const [Appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    try {
      const res = await axios.get(`${url}/users/user-appointments`, {
        withCredentials: true
      },)
      if(res.data.success) {
        setAppointments(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAppointments();
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => {
        return <span>{record.doctorInfo.firstname} {record.doctorInfo.lastname}</span>
      }
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (text, record) => {
        return <span>{record.doctorInfo.phone}</span>
      }
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      render: (text, record) => {
        const date = new Date(record.date);
        const formatted = date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        return <span>{formatted}</span>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
  ]

  return (
    <Layout>
        <Table columns={columns} dataSource={Appointments}></Table>
    </Layout>
  )
}

export default Appointments
