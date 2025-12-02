"use client";

import { useState, type FormEvent } from "react";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <form className="card p-4 responsive-form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Register</h3>

        <input
          type="text"
          placeholder="Enter full name..."
          className="form-control"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email..."
          className="form-control mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password..."
          className="form-control mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100 mt-3">Register</button>
      </form>

      <style jsx>{`
        .responsive-form {
          width: 25%;
          min-width: 350px;
        }

        @media (max-width: 768px) {
          .responsive-form {
            width: 60%;
          }
        }

        @media (max-width: 480px) {
          .responsive-form {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
