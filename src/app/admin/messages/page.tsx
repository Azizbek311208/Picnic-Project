"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { Messages } from "../../../../types";
import { FiMenu } from "react-icons/fi";

const CompletedOrders = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen(!open);

  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const data: Messages[] = querySnapshot.docs.map((docSnap) => {
        const d = docSnap.data() as any;
        return {
          id: docSnap.id,
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email,
          message: d.message,
          phoneNumber: d.phoneNumber,
        };
      });
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-50">
      <div
        className={`
          fixed md:static top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm
          transition-transform duration-500 ease-in-out z-30 w-[250px]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </div>

      <div
        className={`
          flex-1 transition-all duration-500 ease-in-out px-4 py-6
          w-full max-w-full ${!open ? "md:ml-[-230px] " : ""}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-2xl md:hidden p-2 border rounded"
            onClick={toggleSidebar}
          >
            <FiMenu />
          </button>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-2xl" onClick={toggleSidebar}>
              <FiMenu />
            </button>
            <h3 className="m-0 text-xl font-bold">Messages</h3>
          </div>
        </div>

        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No messages found.</p>
        ) : (
          <div
            onClick={() => setOpen(false)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {messages.map((msg) => (
              <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                <h3 className="font-semibold text-lg mb-2">
                  {msg.firstName} {msg.lastName}
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {msg.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {msg.phoneNumber}
                </p>
                <p className="text-gray-700 mt-3">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedOrders;
