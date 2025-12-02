import Link from "next/link";
import "./Main.scss";
const Main = () => {
  return (
    <div className="bigOne">
      <div className="mainWrapper">
        <div className="leftMain">
          <h1>Zo'r jihozlar bilan sarguzashtlarni kashf eting</h1>
          <p>
            Sarguzasht ishqibozlari uchun moʻljallangan ochiq havoda kerakli
            jihozlarimizni kashf eting. Yuqori sifatli chodirlardan qulay lager
            anjomlarigacha, hammasi sizning tajribangizni yuksaltirish uchun.
          </p>
          <div className="buttonOne hover:opacity-75 cursor-pointer ">
            <Link href={"/order"} className="text-decoration-none text-white"> Xarid qiling</Link>
          </div>
          <div className="numbersBelow">
            <div className="firstNumber">
              <h2>
                200<span>+</span>
              </h2>
              <p>Xalqaro Brendlar</p>
            </div>
            <hr />
            <div className="secondNumber">
              <h2>
                2,000<span>+</span>
              </h2>
              <p>Yuqori sifatli mahsulotlar</p>
            </div>
            <hr />
            <div className="thirdNumber">
              <h2>
                30,000<span>+</span>
              </h2>
              <p>Baxtli mijozlar ovozlari</p>
            </div>
          </div>
        </div>
        <div className="rightMain">
          <img src="/main.png" alt="siuuuuuu" />
        </div>
      </div>
    </div>
  );
};

export default Main;
