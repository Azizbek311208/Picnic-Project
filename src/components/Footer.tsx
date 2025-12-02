import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaSquareInstagram,
  FaTwitter,
} from "react-icons/fa6";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="bigBoy">
      <div className="OverallFooter cursor-pointer">
        <div className="ImgPart">
          <img src="/FootPic.png" alt="SayHowAreWe" />
          <div className="InstaTube">
            <button className="Twitter">
              <FaTwitter />
            </button>{" "}
            <button className="Face">
              <FaFacebook />
            </button>{" "}
            <button className="Insta">
              <FaInstagram />
            </button>{" "}
            <button className="Git">
              <FaGithub />
            </button>
          </div>
        </div>
        <div className="Kompaniya">
          <h3>KOMPANIYA</h3>
          <div className="mayda">
            <p>Biz haqimizda</p>
            <p>Xususiyatlar</p>
            <p>Ishlash jarayoni</p>
            <p>Karyera imkoniyatlari</p>
          </div>
        </div>{" "}
        <div className="Kompaniya">
          <h3>YORDAM</h3>
          <div className="mayda">
            <p>Mijozlarni qo'llab-quvvatlash</p>
            <p>Yetkazib berish tafsilotlari</p>
            <p>Shartlar va qoidalar</p>
            <p>Maxfiylik siyosati</p>
          </div>
        </div>{" "}
        <div className="Kompaniya">
          <h3>SAVOLLAR</h3>
          <div className="mayda">
            <p>Hisob</p>
            <p>Yetkazib berishni boshqarish</p>
            <p>Buyurtmalar</p>
            <p>To'lovlar</p>
          </div>
        </div>{" "}
        <div className="Kompaniya">
          <h3>RESURSLAR</h3>
          <div className="mayda">
            <p>Bepul e-kitoblar</p>
            <p>Dasturlash bo'yicha qo'llanmalar</p>
            <p>Qanday foydalanish - Blog</p>
            <p>YouTube pleyist</p>
          </div>
        </div>
      </div>
      <div className="lastThing flex justify-between w-[1240px] h-[70px] align-items-center">
        <span >© 2000-2021, All rights reserved</span>
        <img src="/tolov.png" alt="to'lov" />
      </div>
    </div>
  );
};

export default Footer;
