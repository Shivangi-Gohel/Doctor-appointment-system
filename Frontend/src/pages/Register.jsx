import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/register", {
        username,
        email,
        password,
      });
      dispatch(hideLoading());
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white/30 backdrop-blur-md border rounded-2xl shadow-2xl w-full max-w-md p-8 !border-black/20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm placeholder-gray-700 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 !mt-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm placeholder-gray-700 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 !mt-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm placeholder-gray-700 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSignUp}
            className="w-full py-3 !mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition duration-200"
          >
            Sign Up
          </button>
        </div>
        <p className="text-center !mt-5 text-sm text-gray-700">
          Already Signed up?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
