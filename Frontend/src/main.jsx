import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css'
import './index.css'
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
import BookingPage from './pages/BookingPage.jsx'
import Appointments from './pages/Appointments.jsx'
import DoctorAppointments from './pages/doctor/DoctorAppointments.jsx'

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
  },
  {
    path: "/book-appointment/:doctorId",
    element: (
      <ProtectedRoute>
        <BookingPage/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/appointments",
    element: (
      <ProtectedRoute>
        <Appointments/>
      </ProtectedRoute>
    )
  },
  {
    path: "/doctor-appointments",
    element: (
      <ProtectedRoute>
        <DoctorAppointments/>
      </ProtectedRoute>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <ToastContainer position="top-center" autoClose={2000} />
      <SpinnerWrapper>
        <RouterProvider router={router}/>
      </SpinnerWrapper>
  </Provider>
)