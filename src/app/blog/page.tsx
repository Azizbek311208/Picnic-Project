"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import "./Blog.scss";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blog"), (snap) => {
      setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="blog-page">
      <div className="textPart">
        <h2>Sayohat va Lager Blogi</h2>
        <p>
          Sayohatni sevuvchilar uchun qiziqarli hikoyalar, foydali maslahatlar…
        </p>
      </div>

      <div className="blog-grid">
        {blogs.map((b) => (
          <Link className="text-decoration-none" key={b.id} href={`/blog/${b.id}`}>
            <div className="blog-card cursor-pointer">
              <img src={b.forImg} alt={b.sarlavha} />
              <h3>{b.sarlavha}</h3>
              <p>
                {b.haftaKuni}, {b.yil}-yil {b.kun}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
