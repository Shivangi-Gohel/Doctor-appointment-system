import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const  getUserData = async () => {
    await axios
      .get("http://localhost:8000/api/v1/users", { 
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        const username = response.data.data?.username;
        setName(username || "No name found");
      })
      .catch((error) => {
        console.error("Error during getting user data:", error);
        alert("Getting user data failed. Please try again.");
      });
  }

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout", {}, {
        withCredentials: true,
      });
      alert("Logout successful");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    getUserData()
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{name}</p>
      {/* {console.log(name)}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button> */}
      <Layout/> 
    </div>
  )
}

export default HomePage
