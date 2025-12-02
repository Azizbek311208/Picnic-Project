"use client";

import { useParams } from "next/navigation";
import { useFetchProductsQuery } from "@/(redux)/(api)/ProductApi";
import { useAppDispatch } from "@/(redux)/hooks";
import { addToCart } from "@/(redux)/(slices)/CartSlices";
import { Product } from "../../../../types";
import { useState } from "react";
import { toast } from "react-toastify";
import "./EachProduct.scss";

export default function Page() {
  const { id } = useParams();
  const { data: products = [] } = useFetchProductsQuery(undefined);
  const dispatch = useAppDispatch();

  const product = products.find((p: Product) => p.id === id);

  const images = Array.isArray(product?.imageUrl)
    ? product.imageUrl
    : [product?.imageUrl];

  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  const [quantity, setQuantity] = useState(1);
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => quantity > 1 && setQuantity((q) => q - 1);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
    toast.success("Mahsulot savatga qo'shildi!");
  };

  if (!product) return <p>Mahsulot topilmadi</p>;

  const categories = [
    { img: "/fir.png", title: "Barchasi" },
    { img: "/fir.png", title: "Chodirlar" },
    { img: "/second.png", title: "Mebel" },
    { img: "/third.png", title: "Oshxona jihozlari" },
    { img: "/third.png", title: "Uy ro'zg'or buyumlari" },
    { img: "/four.png", title: "Yotish uchun sumkalar" },
  ];

  return (
    <div className="productDetailCard flex justify-center px-2 sm:px-4">
      <div className="BigMan w-full max-w-[1440px]">
        <div className="categoryPart mt-4 flex gap-4 overflow-x-auto whitespace-nowrap px-2 scrollbar-none">
          {categories.map((cat, i) => (
            <div
              className="firstCat flex items-center gap-2 px-4 py-2 border rounded-full bg-white shrink-0 cursor-pointer transition-transform hover:scale-105 hover:shadow-md"
              key={i}
            >
              <img src={cat.img} alt={cat.title} className="w-6 h-6" />
              <p className="text-sm font-medium m-0">{cat.title}</p>
            </div>
          ))}
        </div>

        <div className="ProductPart flex justify-between items-start mt-8 gap-6 flex-wrap lg:flex-nowrap">
          <div className="thumbnails flex flex-col gap-3 lg:flex-col lg:w-auto sm:flex-row sm:justify-center sm:gap-3 shrink-0">
            {images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} thumbnail ${i + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-[90px] h-[90px] rounded-lg cursor-pointer border transition-all duration-200 ${
                  selectedImage === img
                    ? "border-4 border-green-500 scale-105"
                    : "border "
                }`}
              />
            ))}
          </div>

          <div className="imgWrapper max-w-[582px] w-full h-[530px] bg-[#f9f9f9] rounded-xl flex items-center justify-center overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full max-w-[500px] max-h-[480px] object-contain rounded-lg"
            />
          </div>

          <div className="rightPart max-w-[612px] w-full flex flex-col gap-4">
            <h3 className="text-3xl sm:text-4xl font-bold">{product.title}</h3>
            <h5 className="text-gray-600 mt-1">{product.description}</h5>
            <div className="flex items-center gap-2">
              <span>⭐⭐⭐⭐⭐</span>
            
            </div>

            <div className="flex items-center gap-3">
              <p className="text-2xl sm:text-3xl font-bold mb-0">
                ${product.discountedPrice}
              </p>
              <p className="line-through text-gray-400 mb-0">
                ${product.price}
              </p>
              <span className="text-red-500 font-bold bg-red-100 px-2 py-1 rounded-full">
                -
                {Math.round(
                  ((product.price - product.discountedPrice) / product.price) *
                    100
                )}
                %
              </span>
            </div>

            <div className="flex items-center gap-4 mt-4 flex-wrap sm:flex-nowrap">
              <div className="flex items-center border rounded-full px-4 py-2 gap-3">
                <button className="text-xl" onClick={decreaseQty}>
                  –
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button className="text-xl" onClick={increaseQty}>
                  +
                </button>
              </div>

              <button
                className="btn btn-success px-6 py-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
