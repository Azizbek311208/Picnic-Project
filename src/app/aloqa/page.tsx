"use client";

import { useState } from "react";
import "./Aloqa.scss";
import { db } from "@/firebase/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

const Aloqa = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    const messageData = { firstName, lastName, email, phoneNumber, message };

    try {
      await addDoc(collection(db, "messages"), messageData);
      toast.success(
        "Xabaringiz uchun rahmat! Tez orada siz bilan bog'lanamiz."
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");
    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
    }
  };

  return (
    <div className="aloqaContainer">
      <div className="innerAloqa">
        <div className="imgWrapper">
          <img src="/aloqaPic.png" alt="siuuuuuu" />
        </div>
        <div className="bottomInner">
          <div className="bottomPart">
            <div className="leftSide">
              <h2>Keling, biz bilan gaplashaylik</h2>
              <p>
                Savollar, sharhlar yoki takliflar? Shaklni to'ldiring va biz tez
                orada bog'lanamiz.
              </p>
              <div className="leftBottom">
                <div className="firstP">
                  <img src="/loaction.png" alt="" />
                  <h4>1055 Arthur ave Elk Groot, 67</h4>
                </div>
                <div className="secondP">
                  <img src="/call.png" alt="" />
                  <h4>+1 234 678 9108 99</h4>
                </div>
                <div className="thirdP">
                  <img src="/sms.png" alt="" />
                  <h4>Contact@moralizer.com</h4>
                </div>
              </div>
            </div>
            <div className="rightSide">
              <div className="firstRow">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name*"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name*"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                type="email"
                className="form-control bir"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form-control ikki"
                type="number"
                placeholder="Phone Number*"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <textarea
                cols={8}
                className="form-control uch"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className="bigBoy" onClick={handleSendMessage}>
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Aloqa;
