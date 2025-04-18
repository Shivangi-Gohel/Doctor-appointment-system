import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    dispatch(showLoading())
    await axios
      .post("http://localhost:8000/api/v1/users/login", { 
        email,
        password,
      })
      .then((response) => {
        dispatch(hideLoading())
        console.log(response.data);
        alert(response.data.message);
        navigate("/")
      })
      .catch((error) => {
        dispatch(hideLoading())
        console.error("Error during Login:", error);
        alert("Login failed. Please try again.");
      });
  }; 


  return (
    <div className="flex flex-col gap-2 p-4 w-full justify-center items-center h-screen">
      <div className="flex flex-col gap-4 w-[50%]">
        <div className="text-2xl font-bold text-center mb-4.5">Login</div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="border w-[35%] rounded mx-auto p-2 bg-green-500 self-center" style={{marginTop: 2 + 'em'}} onClick={handleLogin}
        >
          Login
        </button>
        
      </div>
    </div>
  )
}

export default Login
