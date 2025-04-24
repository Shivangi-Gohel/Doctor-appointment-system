import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Layout children={"body"}/> 
    </div>
  )
}

export default HomePage
