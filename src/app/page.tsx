import CarouselPart from "@/components/CarouselPart";
import Main from "@/components/Main";
import ProductsUser from "@/components/ProductsUser";
import Questions from "@/components/Questions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Home() {



  
  return (
    <div>
      <Main />
      <ProductsUser />
      <Questions />
      <CarouselPart />
      <ToastContainer/>
    </div>
  );
}
