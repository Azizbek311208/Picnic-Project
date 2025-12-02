"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, type FormEvent } from "react";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      toast.success("Successfully signed in!");

      if (email === "azizbekfayziyev244@gmail.com" && password === "Azizbek3112") {
        route.push("/admin/products");
      } else {
        route.push("/");
      }
    } catch (error) {
      toast.error("Incorrect email or password!");
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center mt-7 px-2"
  
    >
      <form
        className="card p-4 "
        style={{
          width: "100%",
          maxWidth: "420px", 
          borderRadius: "12px",
        }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-3">Sign In</h3>

        <input
          type="email"
          placeholder="Enter email..."
          className="form-control mt-2 p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password..."
          className="form-control mt-3 p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100 mt-3 p-2 fw-bold">
          Sign In
        </button>

        <p className="mt-3 text-center mb-0">
          If you don't have an account,{" "}
          <Link
            href="/register"
            className="text-success text-decoration-none border-bottom"
            style={{ cursor: "pointer" }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
