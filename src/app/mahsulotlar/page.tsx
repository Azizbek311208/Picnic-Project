"use client";

import { useFetchProductsQuery } from "@/(redux)/(api)/ProductApi";
import { useAppDispatch } from "@/(redux)/hooks";
import { Product } from "../../../types";
import { addToCart } from "@/(redux)/(slices)/CartSlices";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import "./Mahsulotlar.scss"
import { toast, ToastContainer } from "react-toastify";
const categoriesData = [
  { id: "all", title: "Barchasi", img: "/fir.png" },
  { id: "chodir", title: "Chodirlar", img: "/fir.png" },
  { id: "mebel", title: "Mebel", img: "/second.png" },
  { id: "oshxona", title: "Oshxona jihozlari", img: "/third.png" },
  { id: "uy", title: "Uy ro'zg'or buyumlari", img: "/third.png" },
  { id: "sumka", title: "Yotish uchun sumkalar", img: "/four.png" },
];

export default function Mahsulotlar() {
  const { data: products = [] } = useFetchProductsQuery(undefined);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Siz mahsulotni savatga qo'shdingiz!");
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p: Product) =>
            p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="w-full flex justify-center pb-12">
      <div className="max-w-7xl w-full px-4 mt-6">
        <div className="flex gap-4 overflow-x-auto pb-3">
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === cat.id ? "all" : cat.id
                )
              }
              className={`flex items-center gap-2 px-4 rounded-xl  py-2  border transition-all shrink-0
                ${
                  selectedCategory === cat.id
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              <img src={cat.img} alt="" className="w-5 h-5" />
              <span className="whitespace-nowrap">{cat.title}</span>
            </button>
          ))}
        </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {filteredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="group bg-white shadow-sm rounded-2xl p-4 border border-gray-200 
              hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer"
            >
           
              <Link href={`mahsulotlar/${product.id}`}>
                <div className="w-full h-52  rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                   src={product.imageUrl[0]}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

         
              <p className="font-semibold text-lg mt-3 text-gray-800">
                {product.title}
              </p>

       
              <div className="text-yellow-500 mt-1 text-sm">
                {product.rating ? "⭐".repeat(product.rating) : "⭐⭐⭐⭐"}
              </div>

            
              <div className="flex justify-between items-center mt-4">
                <h4 className="text-xl font-bold text-gray-900">
                  ${product.discountedPrice || product.price}
                </h4>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 
                  hover:scale-110 active:scale-95 transition-all"
                >
                  <BsCart2 size={20} />
                </button>
          
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
