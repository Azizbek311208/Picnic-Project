"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Order } from "../../../../types";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { FiMenu } from "react-icons/fi";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen(!open);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "order"));
      const data: Order[] = querySnapshot.docs.map((docSnap) => {
        const d = docSnap.data() as any;
        return {
          id: docSnap.id,
          fullName: d.fullName,
          email: d.email,
          address: d.address,
          products: d.products,
          totalPrice: d.totalPrice,
          sms: d.sms,
          status: d.status || "pending",
        };
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCompleteClick = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleConfirm = async (status: "completed" | "canceled") => {
    if (!selectedOrder) return;
    try {
      const ref = doc(db, "order", selectedOrder.id);
      await updateDoc(ref, { status });
      setOrders((prev) =>
        prev.map((o) => (o.id === selectedOrder.id ? { ...o, status } : o))
      );
      setShowModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStatusBadge = (status: string) => {
    const base =
      "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center";

    switch (status) {
      case "completed":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            <CheckCircle size={16} /> Completed
          </span>
        );
      case "canceled":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            <XCircle size={16} /> Canceled
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-600`}>
            <Clock size={16} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
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
          flex-1 transition-all duration-500 ease-in-out px-4 w-full
          ${!open ? "md:ml-[-230px]" : ""}
        `}
      >
        <div className="flex justify-between items-center ml-6 py-4 ">
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
            <h3 className="m-0">Orders Management</h3>
          </div>
        </div>

        <div
          onClick={() => setOpen(false)}
          className={`overflow-x-auto bg-white p-3 rounded shadow-sm w-full max-w-[1200px] mx-auto  ${
            !open ? "max-w-[2000px]" : ""
          }`}
        >
          <table className="table table-bordered text-center align-middle w-full">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Products</th>
                <th>Address</th>
                <th>Price</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.fullName}</td>
                    <td>{order.email}</td>
                    <td>
                      <div className="flex flex-col text-sm max-h-36 overflow-y-auto">
                        {order.products?.map((product) => (
                          <span key={product.id}>
                            {product.title} —{" "}
                            <span className="font-medium">
                              {product.quantity}x
                            </span>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{order.address}</td>
                    <td className="font-medium">${order.totalPrice}</td>
                    <td>{order.sms || "—"}</td>
                    <td>{renderStatusBadge(order.status)}</td>
                    <td>
                      <button
                        onClick={() => handleCompleteClick(order)}
                        className="btn btn-sm btn-outline-primary w-100"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Rodal
        visible={showModal}
        onClose={() => setShowModal(false)}
        customStyles={{
          borderRadius: "14px",
          width: "360px",
          height: "220px",
          padding: "20px",
        }}
      >
        <h3 className="text-xl font-semibold text-center mb-4">
          Update Order Status
        </h3>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => handleConfirm("canceled")}
            className="btn btn-danger w-1/2 hover:bg-red-700 transition"
          >
            Cancel Order
          </button>

          <button
            onClick={() => handleConfirm("completed")}
            className="btn btn-primary w-1/2 hover:bg-blue-700 transition"
          >
            Mark Completed
          </button>
        </div>
      </Rodal>
    </div>
  );
};

export default Orders;
