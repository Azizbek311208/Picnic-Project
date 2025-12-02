"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from "next/navigation";


const AdminHome = () => {
  const [open, setOpen] = useState(true);

 
  const [user] = useState(true); 

  const route = useRouter();


  if (!user) {
    route.push("/login");
    return null;
  }

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="relative flex admin-wrapper">
      <button
        onClick={toggleSidebar}
        className="absolute right-4 top-4 z-50 text-3xl cursor-pointer"
      >
        <HiMenuAlt3 />
      </button>

      <div
        className={`sidebar border-r border-gray-300 h-screen bg-white transition-all duration-300 
        ${open ? "w-[20%]" : "w-0 overflow-hidden transition-all duration-300 ease-in-out"}`}
      >
        <Sidebar />
      </div>

      <div
        className={`content transition-all duration-300 
        ${open ? "w-[80%]" : "w-full"}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
