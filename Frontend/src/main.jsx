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

const SpinnerWrapper = ({children}) => {
  const loading = useSelector((state) => state.alerts.loading);
  
  return (
    <>
      {loading ? <Spinner/> : children  }
      {console.log(loading)}
      
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute> 
        <HomePage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      // <PublicRoute>
        <Login />
      // </PublicRoute>
    )
  },
  {
    path: "/register",
    element: (
      // <PublicRoute>
        <Register />
      // </PublicRoute>
    ),
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <SpinnerWrapper>
        <RouterProvider router={router}/>
      </SpinnerWrapper>
    </StrictMode>
  </Provider>
)