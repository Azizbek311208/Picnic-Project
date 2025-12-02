"use client";

import Link from "next/link";
import { useState } from "react";
import { HiX } from "react-icons/hi";

const First = () => {
  const [close, setClose] = useState(true);

  return (
    <div
      className={`bg-green-800 ${close ? "flex" : "hidden"} justify-center px-4`}
    >
      <div className="w-full max-w-[1400px] h-[38px] flex items-center justify-between">
        
        <div className="flex-1 text-center text-white text-sm sm:text-base">
          Sign up if you are admin to go to Admin Panel
          <Link href="/sign-up" className="text-white underline ml-2">
            Sign up
          </Link>
        </div>

  
        <button onClick={() => setClose(false)} className="ml-2">
          <HiX className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
};

export default First;
