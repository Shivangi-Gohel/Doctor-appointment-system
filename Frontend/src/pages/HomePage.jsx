import React, { useEffect, useState } from 'react'
import axios from 'axios'

function HomePage() {
  const [name, setName] = useState("");

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

  useEffect(() => {
    getUserData()
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{name}</p>
      {console.log(name)}
      
    </div>
  )
}

export default HomePage
