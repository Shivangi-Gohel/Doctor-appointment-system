import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner.jsx'
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import PublicRoute from './components/PublicRoutes.jsx'
import ApplyDoctor from './pages/ApplyDoctor.jsx'
import Doctors from './pages/admin/Doctors.jsx'
import Users from './pages/admin/Users.jsx'
import Profile from './pages/doctor/Profile.jsx'

const SpinnerWrapper = ({children}) => {
  const loading = useSelector((state) => state.alerts.loading);
  
  return (
    <>
      {loading ? <Spinner/> : children  }
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute> 
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/apply-doctor",
    element: (
      <ProtectedRoute>
        <ApplyDoctor />
      </ProtectedRoute>
    ),
  },
  {
    path: "/getAllUsers",
    element: (
      <ProtectedRoute>
        <Users/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/getAllDoctors",
    element: (
      <ProtectedRoute>
        <Doctors/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
    ),
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <StrictMode> */}
      <SpinnerWrapper>
        <RouterProvider router={router}/>
      </SpinnerWrapper>
    {/* </StrictMode> */}
  </Provider>
)