import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'
import { url } from '../../constant'

const Users = () => {
  const [users, setUsers] = useState([])
  
  const getUsers = async () => {
    try {
      const res = await axios.get(`${url}/admin/getAllUsers`, {
        withCredentials: true,
      });
      
      if (res.data.success) {
        setUsers(res.data.data)
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => {
        return <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          <button className='text-center ml-2 bg-red-500 p-2 rounded text-black'>Block</button>
        </div>
      ),
    },

  ]
  const handleEdit = (record) => {
    console.log('Edit', record)
  }
  const handleDelete = (record) => {
    console.log('Delete', record)
  }


  return (
    <Layout>
        <h1>All Users</h1>
        <Table columns={columns} dataSource={users}/>
    </Layout>
  )
}

export default Users
