"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import "./EachBlog.scss";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      const docRef = doc(db, "blog", Array.isArray(id) ? id[0] : id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="loading">Loading...</p>;

  return (
    <div className="blog-detail-page">
      <div className="blog-content">
        <div className="left-side">
          <img src={blog.forImg} alt={blog.sarlavha} />
        </div>
        <div className="right-side">
          <h2>{blog.sarlavha}</h2>
          <p className="description">{blog.description}</p>
          <div className="author-date">
            <span>  {blog.haftaKuni}, {blog.yil}-yil {blog.kun}</span>
            <span>Azizbek Fayziyev</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
