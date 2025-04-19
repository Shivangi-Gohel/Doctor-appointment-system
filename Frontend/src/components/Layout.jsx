import React from "react";
import { SidebarMenu } from "../Data/data";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const {user} = useSelector((state) => state.user)
  
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
            {SidebarMenu.map((item, index) => (
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
          </div>
        </div>
        <div className="w-full h-full">
          <div className="h-[10vh] mb-5 shadow shadow-gray-500 bg-white">
            <div className="flex items-center h-12.5 justify-end my-0 mx-4">
            <i class="fa-solid fa-bell mr-5 mt-5 text-xl"></i>
            <Link to='/profile' className="text-blue-600 uppercase text-xl mt-5">{user.username}</Link>
            </div>
          </div>
          <div className="h-[85vh] mb-5 shadow shadow-gray-500 bg-white">
            Body
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
