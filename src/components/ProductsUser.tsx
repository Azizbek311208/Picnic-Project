"use client";

import { useFetchProductsQuery } from "@/(redux)/(api)/ProductApi";
import "./ProductsUser.scss";
import { useAppDispatch, useAppSelector } from "@/(redux)/hooks";
import { Product } from "../../types";
import { addToCart } from "@/(redux)/(slices)/CartSlices";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";

const categoriesData = [
  { id: "all", title: "Barchasi", img: "/fir.png" },
  { id: "chodir", title: "Chodirlar", img: "/fir.png" },
  { id: "mebel", title: "Mebel", img: "/second.png" },
  { id: "oshxona", title: "Oshxona jihozlari", img: "/third.png" },
  { id: "uy", title: "Uy ro'zg'or buyumlari", img: "/third.png" },
  { id: "sumka", title: "Yotish uchun sumkalar", img: "/four.png" },
];

const ProductsUser = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.value);

  const { data: products = [], isLoading } = useFetchProductsQuery(searchValue);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Mahsulot savatga qo'shildi!");
  };

  const displayedProducts = products.filter((p: Product) => {
    const matchesSearch =
      searchValue.trim().length === 0 ||
      p.title.toLowerCase().includes(searchValue.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

  return (
    <div className="overallProduct">
      <div className="mainWrapper">
        <h1>Kategoriya va Mahsulotlar</h1>

        <div className="flex gap-4 overflow-x-auto pb-4 shrink-0 categoryPart" >
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              className={`firstCat ${
                selectedCategory === cat.id ? "border-2 border-green-500" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === cat.id ? "all" : cat.id
                )
              }
            >
              <img src={cat.img} alt={cat.title} />
              <p>{cat.title}</p>
            </div>
          ))}
        </div>

        <div className="productsGrid">
          {isLoading && <p>Yuklanmoqda...</p>}

          {!isLoading && displayedProducts.length === 0 && (
            <p className="text-center text-gray-500 text-lg mt-4">
              Hech narsa topilmadi 😔
            </p>
          )}

          {displayedProducts.map((product: Product) => {
            const image = Array.isArray(product.imageUrl)
              ? product.imageUrl[0]
              : product.imageUrl || "/no-img.png";

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-lg transition-all cursor-pointer group"
              >
                <Link href={`/mahsulotlar/${product.id}`}>
                  <div className="w-full h-52  rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={image}
                      alt={product.title}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>

                <p className="font-semibold text-lg mt-3 text-gray-800">
                  {product.title}
                </p>

                <div className="text-yellow-500 mt-1 text-sm flex">
                  {Array(getRandomRating()).fill("⭐").join("")}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    ${product.discountedPrice || product.price}
                  </h4>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all"
                  >
                    <BsCart2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-content-center xello">
          <Link href={"/mahsulotlar"}>
            <button className="lastBtn">Hammasini ko'rish</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsUser;
