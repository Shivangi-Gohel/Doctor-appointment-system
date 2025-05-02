import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { url } from '../constant';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        `${url}/users/login`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(hideLoading());
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      dispatch(hideLoading());
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 border !border-black/20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 !mt-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 !mt-3 bg-green-500 hover:bg-green-600 font-semibold rounded-xl transition duration-200"
          >
            Login
          </button>
        </div>
        <p className="text-center !mt-5 text-sm text-gray-600">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
