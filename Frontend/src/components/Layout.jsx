import React, { Children, useEffect, useState } from "react";
import { adminMenu, userMenu } from "../Data/data";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import axios from "axios";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/me", {
        withCredentials: true,
      });
      
      setNotifications(res.data.data.notification || []);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      alert("Logout successful");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  const doctorMenu = [
    {
        name: 'Home',
        path: '/',
        icon: 'fa-solid fa-house'
    },
    {
        name: 'Appoinments',
        path: '/appoinments',
        icon: 'fa-solid fa-calendar-check'
    },
    {
        name: 'Profile',
        path: `/profile/${user?._id}`,
        icon: 'fa-solid fa-user'
    },
]

  // rendering menu list
  const sidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  
  return (
    <div className="p-2.5 h-screen">
      <div className="flex">
        <div className="min-h-full w-75 rounded-sm bg-amber-950 shadow-lg mr-5 text-white">
          <div>
            <h6 className="text-2xl text-center mx-0 my-5 h-[8.5vh]">
              DOC APP
            </h6>
            <hr />
          </div>
          <div className="mt-5">
            {sidebarMenu.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 m-3 rounded transition ${
                    isActive
                      ? "bg-white text-amber-950 font-semibold"
                      : "text-white"
                  }`
                }
              >
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </NavLink>
            ))}
            <div
              onClick={handleLogout}
              className="flex items-center gap-4 p-2 m-3 rounded transition"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="h-[10vh] mb-5 shadow shadow-gray-500 bg-white">
            <div className="flex items-center h-12.5 justify-end my-0 mx-4">
              <Bell
                className="mr-5 mt-5 text-xl cursor-pointer"
                onClick={fetchNotifications}
                fill="black"
                repeatCount={notifications.length}
              />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                  {notifications.length}
                </span>
              )}
              {open && (
                <div className="absolute right-16 top-12 bg-white shadow-md rounded-md p-4 w-80 z-50 max-h-96 overflow-y-auto">
                  <h4 className="text-lg font-semibold mb-2">Notifications</h4>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-600">
                      {/* No new notifications */}
                    </p>

                  ) : (
                    notifications.map((n, i) => (
                      <div key={i} className="border-b py-2 text-sm">
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
              <Link
                to="/profile"
                className="text-blue-600 uppercase text-xl mt-5"
              >
                {user.username}
              </Link>
            </div>
          </div>
          <div className="h-[85vh] mb-5 shadow shadow-gray-500 bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
