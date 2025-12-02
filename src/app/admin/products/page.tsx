"use client";

import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Sidebar from "../Sidebar";
import {
  useAddProductsMutation,
  useDeleteProductsMutation,
  useEditProductMutation,
  useFetchProductsQuery,
} from "@/(redux)/(api)/ProductApi";
import { useAppDispatch, useAppSelector } from "@/(redux)/hooks";
import {
  closeModal,
  getProductForm,
  openModal,
  resetEditingId,
  resetForm,
  updateProduct,
} from "@/(redux)/(slices)/ProductSlices";
import { Product } from "../../../../types";
import { FiMenu } from "react-icons/fi";

const AdminProduct = () => {
  const { data: products = [] } = useFetchProductsQuery(undefined);
  const [addPost] = useAddProductsMutation();
  const [editPost] = useEditProductMutation();
  const [deletePost] = useDeleteProductsMutation();
  const { productForm, visible, editingId } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();

  const [images, setImages] = useState<string[]>([""]);

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleAddImageInput = () => {
    setImages([...images, ""]);
  };

  const handleSave = () => {
    const productData = {
      ...productForm,
      imageUrl: images,
    };

    if (editingId == null) addPost(productData);
    else {
      editPost({ ...productData, id: editingId });
      dispatch(resetEditingId());
    }

    dispatch(resetForm());
    dispatch(closeModal());
    setImages([""]);
  };

  const handleUpdate = (product: Product) => {
    if (Array.isArray(product.imageUrl)) setImages(product.imageUrl);
    else setImages([product.imageUrl]);
    dispatch(updateProduct(product));
    dispatch(openModal());
  };

  const [open, setOpen] = useState(true);
  const toggleSidebar = () => setOpen(!open);

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
          ${!open ? "md:ml-[-250px]" : ""}
        `}
      >
        <div className="flex justify-between items-center ml-5 py-4">
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
            <h3 className="m-0">Products</h3>
          </div>

          <button
            onClick={() => {
              setImages([""]);
              dispatch(openModal());
            }}
            className="btn btn-outline-primary"
          >
            Add Product
          </button>
        </div>

        <div
          onClick={() => setOpen(false)}
          className={`overflow-x-auto bg-white p-3 rounded shadow-sm w-full max-w-[1200px] mx-auto ${
            !open ? "max-w-[1500px]" : ""
          }`}
        >
          <table className="table table-bordered text-center align-middle w-full">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discounted Price</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product: Product) => (
                <tr key={product.id}>
                  <td data-label="Image" className="flex justify-center">
                    <img
                      width={70}
                      height={50}
                      src={
                        Array.isArray(product.imageUrl)
                          ? product.imageUrl[0]
                          : product.imageUrl
                      }
                      alt="product"
                      className="rounded"
                    />
                  </td>

                  <td data-label="Title">{product.title}</td>
                  <td data-label="Category">{product.category}</td>
                  <td
                    data-label="Description"
                    className="text-truncate"
                    style={{ maxWidth: "250px" }}
                  >
                    {product.description}
                  </td>
                  <td data-label="Price">${product.price}</td>
                  <td
                    data-label="Discounted Price"
                    className="text-success fw-semibold"
                  >
                    ${product.discountedPrice}
                  </td>
                  <td data-label="Rating">{product.rating} ⭐</td>

                  <td data-label="Actions">
                    <button
                      className="btn btn-sm btn-outline-primary me-2 w-100 mb-1"
                      onClick={() => handleUpdate(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger w-100"
                      onClick={() => deletePost(product.id + "")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Rodal
        visible={visible}
        customStyles={{ height: "max-content" }}
        onClose={() => dispatch(closeModal())}
      >
        <div className="mt-4">
          {images.map((img, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder={`Image URL ${index + 1}`}
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              {index === images.length - 1 && (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleAddImageInput}
                >
                  Add
                </button>
              )}
            </div>
          ))}

          <input
            value={productForm.title}
            onChange={(e) =>
              dispatch(getProductForm({ key: "title", value: e.target.value }))
            }
            type="text"
            className="form-control mt-2"
            placeholder="Title..."
          />

          <select
            value={productForm.category}
            onChange={(e) =>
              dispatch(
                getProductForm({ key: "category", value: e.target.value })
              )
            }
            className="form-select mt-2"
          >
            <option value="">Select category</option>
            <option value="Chodirlar">Chodirlar</option>
            <option value="Mebel">Mebel</option>
            <option value="Oshxona jihozlari">Oshxona jihozlari</option>
            <option value="Uy ro'zg'or buyumlari">Uy ro'zg'or buyumlari</option>
            <option value="Yotish uchun sumkalar">Yotish uchun sumkalar</option>
          </select>

          <input
            value={productForm.description}
            onChange={(e) =>
              dispatch(
                getProductForm({ key: "description", value: e.target.value })
              )
            }
            type="text"
            className="form-control mt-2"
            placeholder="Description..."
          />

          <input
            value={productForm.price}
            onChange={(e) =>
              dispatch(getProductForm({ key: "price", value: e.target.value }))
            }
            type="number"
            className="form-control mt-2"
            placeholder="Price..."
          />

          <input
            value={productForm.discountedPrice}
            onChange={(e) =>
              dispatch(
                getProductForm({
                  key: "discountedPrice",
                  value: e.target.value,
                })
              )
            }
            type="number"
            className="form-control mt-2"
            placeholder="Discount price..."
          />

          {/* <input
            value={productForm.rating}
            onChange={(e) =>
              dispatch(getProductForm({ key: "rating", value: e.target.value }))
            }
            type="number"
            className="form-control mt-2"
            placeholder="Rating..."
          /> */}

          <button className="btn btn-primary w-100 mt-2" onClick={handleSave}>
            Save
          </button>
        </div>
      </Rodal>
    </div>
  );
};

export default AdminProduct;
