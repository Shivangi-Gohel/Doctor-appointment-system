import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout";
import { Table } from 'antd'
import axios from "axios";

const DoctorAppointments = () => {
  const [Appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/doctors/doctor-appointments",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async(record, status) => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/doctors/update-status", {appointmentsId: record._id, status}, {
        withCredentials: true
      })

      if(res.data.success) {
        alert(res.data.message)
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong")
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => {
        const date = new Date(record.date);
        const formatted = date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return <span>{formatted}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => (
            <div className="d-flex">
                {record.status === 'pending' && (
                    <div className="d-flex">
                        <button className="bg-green-600 rounded p-2 !text-white" onClick={() => handleStatus(record, "approved")}>Approved</button>
                        <button className="bg-red-600 rounded p-2 !ml-4 !text-white" onClick={() => handleStatus(record, "reject")}>Reject</button>
                    </div>
                )}
            </div>           
        )
    }
  ];

  return (
    <Layout>
      <Table columns={columns} dataSource={Appointments || []}></Table>
    </Layout>
  );
};

export default DoctorAppointments;
