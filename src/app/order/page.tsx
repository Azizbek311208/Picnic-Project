"use client";

import { useAppDispatch, useAppSelector } from "@/(redux)/hooks";
import "rodal/lib/rodal.css";
import "./Order.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Product } from "../../../types";
import { MdDelete } from "react-icons/md";
import {
  clear,
  decrease,
  increase,
  remove,
} from "@/(redux)/(slices)/CartSlices";
import { useState } from "react";
import Rodal from "rodal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

const OrderPart = () => {
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [sms, setSms] = useState("");
  const [open, setOpen] = useState(false);

  const calculatePrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateDiscountedPrice = () =>
    cartItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );

  const handleBuy = async () => {
    if (!fullName || !email || !address) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    const orderData = {
      fullName,
      email,
      address,
      sms,
      products: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        price: item.price,
        discountedPrice: item.discountedPrice,
        quantity: item.quantity,
        description: item.description,
        category: item.category,
      })),
      totalPrice: calculateDiscountedPrice(),
    };

    try {
      await addDoc(collection(db, "order"), orderData);
      dispatch(clear());
      setOpen(false);
      setFullName("");
      setEmail("");
      setAddress("");
      setSms("");
      alert("Buyurtmangiz muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      {cartItems.length === 0 ? (
        <div className="text-center mt-8">Sizning savatingiz bo‘sh</div>
      ) : (
        <div>
          <h2 className="fw-bold mb-4 text-2xl">Sizning savatingiz</h2>
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-sm p-4 border border-gray-200">
                {cartItems.map((item: Product) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-info">
                      <img
                        src={
                          Array.isArray(item.imageUrl)
                            ? item.imageUrl[0]
                            : item.imageUrl
                        }
                        alt={item.title}
                        className="cart-item-img"
                      />
                      <div>
                        <h6 className="fw-semibold">{item.title}</h6>
                        <p className="fw-bold mb-0">${item.discountedPrice}</p>
                      </div>
                    </div>

                    <div className="quantity-controls">
                      <button
                        onClick={() => dispatch(decrease(item.id))}
                        className="btn btn-light border rounded-circle"
                      >
                        −
                      </button>
                      <span className="fw-semibold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increase(item.id))}
                        className="btn btn-light border rounded-circle"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn text-danger fs-5"
                      onClick={() => dispatch(remove(item.id))}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-4 shadow-sm p-4 border border-gray-200">
                <h5 className="fw-bold mb-4">Buyurtma xulosasi</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Oraliq jami</span>
                  <span className="fw-semibold">${calculatePrice()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Chegirma</span>
                  <span className="text-danger fw-semibold">
                    -${calculatePrice() - calculateDiscountedPrice()}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Umumiy</span>
                  <span className="fw-bold">${calculateDiscountedPrice()}</span>
                </div>
                <div className="d-flex mb-3">
                  <input
                    type="text"
                    placeholder="Promo code qo‘shing"
                    className="form-control rounded-start-pill border-end-0"
                  />
                  <button className="btn btn-success rounded-end-pill px-3">
                    Tekshirish
                  </button>
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="btn btn-success w-100 rounded-pill py-2 fw-semibold"
                >
                  Buyurtma berish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Rodal
        visible={open}
        className="p-10"
        customStyles={{ height: "565px" }}
        onClose={() => setOpen(false)}
      >
        <h4 className="text-center mt-4 fs-4">
          Buyurtma Berish Ma’lumotlarini Kiriting
        </h4>

        <div>
          <label className="mt-4" htmlFor="yes">
            Ism va Familiya
          </label>
          <input
            id="yes"
            type="text"
            placeholder="To'liq ism va familiyangizni kiriting"
            className="form-control mt-1"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="no">Email manzil</label>
          <input
            id="no"
            type="email"
            placeholder="Email manzilingizni kiriting"
            className="form-control mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="hello">Manzil</label>
          <textarea
            id="hello"
            placeholder="Manzilingizni kiriting"
            className="form-control mt-1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="messi">Xabar</label>
          <textarea
            id="messi"
            placeholder="Qo‘shimcha ma’lumot yoki talabalaringizni yozing"
            className="form-control mt-1"
            value={sms}
            onChange={(e) => setSms(e.target.value)}
          />
        </div>

        <button onClick={handleBuy} className="mt-3 btn btn-success w-100">
          Sotib Olish
        </button>
      </Rodal>
    </div>
  );
};

export default OrderPart;
