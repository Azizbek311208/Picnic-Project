"use client";

import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { FiMenu } from "react-icons/fi";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [forImg, setForImg] = useState("");
  const [sarlavha, setSarlavha] = useState("");
  const [yil, setYil] = useState("");
  const [haftaKuni, setHaftaKuni] = useState("");
  const [kun, setKun] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [open, setOpen] = useState(true);
  const [description, setDescription] = useState("");

  const toggleSidebar = () => setOpen(!open);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blog"), (snap) => {
      setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "blog", id));
  };

  const handleEdit = (blog: any) => {
    setEditingBlogId(blog.id);
    setForImg(blog.forImg);
    setSarlavha(blog.sarlavha);
    setDescription(blog.description);
    setYil(blog.yil.toString());
    setHaftaKuni(blog.haftaKuni);
    setKun(blog.kun);
    setIsModalOpen(true);
  };

  const saveBlog = async () => {
    if (editingBlogId) {
      await updateDoc(doc(db, "blog", editingBlogId), {
        forImg,
        sarlavha,
        description,
        yil: Number(yil),
        haftaKuni,
        kun,
      });
      setEditingBlogId(null);
    } else {
      await addDoc(collection(db, "blog"), {
        forImg,
        sarlavha,
        description,
        yil: Number(yil),
        haftaKuni,
        kun,
      });
    }

    setIsModalOpen(false);
    setForImg("");
    setDescription("");
    setSarlavha("");
    setYil("");
    setHaftaKuni("");
    setKun("");
  };

  return (
    <div className="min-h-screen flex">
      <div
        className={`fixed md:static top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm
          transition-all duration-500 ease-in-out transform z-30
          ${
            open
              ? "translate-x-0 w-[250px] opacity-100"
              : "-translate-x-full w-0 opacity-0"
          }`}
      >
        {open && <Sidebar />}
      </div>

      <div
        className={`flex-1 transition-all duration-500 ease-in-out px-4 ${
          open ? "md:ml-[60px]" : "md:ml-0 mx-auto max-w-full"
        }`}
      >
        <div className="flex justify-between items-center py-4">
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
            <h3 className="m-0 text-xl font-bold">Admin Posts</h3>
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Yangi Blog
          </button>
        </div>

        <div
          onClick={() => setOpen(false)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4"
        >
          {blogs.map((b) => (
            <div
              key={b.id}
              className="border rounded-xl p-3 shadow bg-white relative"
            >
              <img
                src={b.forImg}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="font-semibold mt-2">{b.sarlavha}</h2>
              <p className="text-gray-500 text-sm">
                {b.kun} • {b.haftaKuni} • {b.yil}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  className="px-2 py-1 bg-yellow-400 text-white rounded text-sm"
                  onClick={() => handleEdit(b)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Rodal
        visible={isModalOpen}
        customStyles={{ height: "440px" }}
        onClose={() => setIsModalOpen(false)}
        width={420}
      >
        <h2 className="text-xl font-semibold mb-4">Yangi Blog Qo'shish</h2>

        <input
          className="form-control border w-full p-2 rounded mb-2"
          placeholder="Rasm URL"
          value={forImg}
          onChange={(e) => setForImg(e.target.value)}
        />

        <input
          className="form-control border w-full p-2 rounded mb-2"
          placeholder="Sarlavha"
          value={sarlavha}
          onChange={(e) => setSarlavha(e.target.value)}
        />

        <input
          className="form-control border w-full p-2 rounded mb-2"
          placeholder="Tavsifnoma"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-control border w-full p-2 rounded mb-2"
          value={yil}
          onChange={(e) => setYil(e.target.value)}
        >
          <option value="">Yilni tanlang</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
          <option value="1999">1999</option>
        </select>

        <select
          className="form-control border w-full p-2 rounded mb-2"
          value={kun}
          onChange={(e) => setKun(e.target.value)}
        >
          <option value="">Kunni tanlang</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>

        <select
          className="form-control border w-full p-2 rounded mb-2"
          value={haftaKuni}
          onChange={(e) => setHaftaKuni(e.target.value)}
        >
          <option value="">Hafta kunini tanlang</option>
          <option value="Dushanba">Dushanba</option>
          <option value="Seshanba">Seshanba</option>
          <option value="Chorshanba">Chorshanba</option>
          <option value="Payshanba">Payshanba</option>
          <option value="Juma">Juma</option>
          <option value="Shanba">Shanba</option>
          <option value="Yakshanba">Yakshanba</option>
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={saveBlog}
            className="px-3 w-100 py-1 bg-blue-600 text-white rounded"
          >
            Saqlash
          </button>
        </div>
      </Rodal>
    </div>
  );
};

export default Posts;
