"use client";

import { useState } from "react";
import "./Questions.scss";
import { FiPlus } from "react-icons/fi";

const Questions = () => {
  const [drop, setDrop] = useState(false);
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [drop4, setDrop4] = useState(false);
  const [drop5, setDrop5] = useState(false);
  const [drop6, setDrop6] = useState(false);

  return (
    <div className="questionWrapper">
      <div className="questionInner">
        <h1>Tez-tez beriladigan savollar</h1>

        <div className="questions">
    
          <div className="questionItem">
            <div className="flex justify-between align-items-center">
              <h2>Mahsulotlarni qanday buyurtma qilsa bo‘ladi?</h2>
              <span
                onClick={() => setDrop(!drop)}
                className="pr-[22px] cursor-pointer"
              >
                <FiPlus size={22} className={drop ? "rotate-45" : ""} />
              </span>
            </div>
            <p className={drop ? "block" : "hidden"}>
              Javob: Ushbu xizmat foydalanuvchilarga o'z ehtiyojlariga mos
              yechimlarni taqdim etadi.
            </p>
          </div>

          <div className="questionItem">
            <div className="flex justify-between align-items-center">
              <h2>To‘lov usullari qanday?</h2>
              <span
                onClick={() => setDrop1(!drop1)}
                className="pr-[22px] cursor-pointer"
              >
                <FiPlus size={22} className={drop1 ? "rotate-45" : ""} />
              </span>
            </div>
            <p className={drop1 ? "block" : "hidden"}>
              Javob: To‘lovlar karta, naqd pul yoki onlayn tizimlar orqali
              amalga oshiriladi.
            </p>
          </div>

        
          <div className="questionItem">
            <div className="flex justify-between align-items-center">
              <h2>Yetkazib berish muddati qanday?</h2>
              <span
                onClick={() => setDrop2(!drop2)}
                className="pr-[22px] cursor-pointer"
              >
                <FiPlus size={22} className={drop2 ? "rotate-45" : ""} />
              </span>
            </div>
            <p className={drop2 ? "block" : "hidden"}>
              Javob: Odatda 2–5 ish kuni ichida yetkazib beriladi.
            </p>
          </div>

          <div className="questionItem">
            <div className="flex justify-between align-items-center">
              <h2>Mahsulotni qaytarish mumkinmi?</h2>
              <span
                onClick={() => setDrop3(!drop3)}
                className="pr-[22px] cursor-pointer"
              >
                <FiPlus size={22} className={drop3 ? "rotate-45" : ""} />
              </span>
            </div>
            <p className={drop3 ? "block" : "hidden"}>
              Javob: 14 kun ichida qaytarish yoki almashtirish mumkin.
            </p>
          </div>

     
          <div className="questionItem">
            <div className="flex justify-between align-items-center">
              <h2>Chegirmalar mavjudmi?</h2>
              <span
                onClick={() => setDrop4(!drop4)}
                className="pr-[22px] cursor-pointer"
              >
                <FiPlus size={22} className={drop4 ? "rotate-45" : ""} />
              </span>
            </div>
            <p className={drop4 ? "block" : "hidden"}>
              Javob: Maxsus bayramlarda va aksiya kunlarida chegirmalar taqdim
              etiladi.
            </p>
          </div>


          <div className="questionItem">
            <div className="flex justify-between align-items-center">
              <h2>Qo‘llab-quvvatlash xizmatiga qanday murojaat qilaman?</h2>
              <span
                onClick={() => setDrop5(!drop5)}
                className="pr-[22px] cursor-pointer"
              >
                <FiPlus size={22} className={drop5 ? "rotate-45" : ""} />
              </span>
            </div>
            <p className={drop5 ? "block" : "hidden"}>
              Javob: Siz bizga telefon, email yoki Telegram orqali murojaat
              qilishingiz mumkin.
            </p>
          </div>

  
          <div className="questionItem">
            <div className="flex justify-between align-items-center">
              <h2>Mahsulotlar kafolat bilan beriladimi?</h2>
              <span
                onClick={() => setDrop6(!drop6)}
                className="pr-[22px] cursor-pointer"
              >
                <FiPlus size={22} className={drop6 ? "rotate-45" : ""} />
              </span>
            </div>
            <p className={drop6 ? "block" : "hidden"}>
              Javob: Ha, barcha mahsulotlarimizga kafolat taqdim etamiz. Kafolat
              muddati mahsulot turiga qarab o‘zgaradi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
