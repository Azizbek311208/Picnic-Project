import Link from "next/link";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp, IoHomeOutline } from "react-icons/io5";
import { TbCircleDashedLetterP } from "react-icons/tb";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { useRouter } from "next/navigation";

// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase/firebase.config";

const AdminSidebar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/sign-up");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // const adminRoutes = [
  //   {
  //     link: "/admin/products",
  //     name: "Products",
  //     icon: MdOutlineShoppingCart,
  //     action: () => Link("/admin/products"),
  //   },
  //   {
  //     link: "/admin/orders",
  //     name: "Orders",
  //     icon: FaBagShopping,
  //     action: () => navigate("/admin/orders"),
  //   },
  //   {
  //     link: "/admin/completed",
  //     name: "Completed",
  //     icon: IoCheckmarkDoneCircleSharp,
  //     action: () => navigate("/admin/completed"),
  //   },
  //   {
  //     link: "/",
  //     name: "Home",
  //     icon: IoHomeOutline,
  //     action: () => navigate("/"),
  //   },
  //   // {
  //   //   link: "/sign-in",
  //   //   name: "Log out",
  //   //   icon: CiLogout,
  //   //   action: handleLogout,
  //   // },
  // ];

  return (
    <div className=" px-3 h-screen py-4">
      <Link className="text-decoration-none" href={"/"}>
        <h1 className="text-center cursor-pointer text-decoration-none">
          Admin
        </h1>
      </Link>

      <div className="py-5 flex flex-col items-center gap-3">
        <div className="w-100 px-3 border cursor-pointer hover:bg-black hover:text-white flex gap-1 align-center">
          <MdOutlineShoppingCart size={22} className="mt-3" />
          <Link className="text-decoration-none" href={"/admin/products"}>
            <p className="font-bold mt-3 mx-2 text-decoration-none ">
              Products
            </p>
          </Link>
        </div>
        <div className="w-100 px-3 border cursor-pointer hover:bg-black hover:text-white flex gap-1 align-center">
          <FaBagShopping size={22} className="mt-3" />
          <Link className="text-decoration-none" href={"/admin/orders"}>
            <p className="font-bold mt-3 mx-2 text-decoration-none">Orders</p>
          </Link>
        </div>{" "}
        <div className="w-100 px-3 border cursor-pointer hover:bg-black hover:text-white flex gap-1 align-center">
          <IoCheckmarkDoneCircleSharp size={22} className="mt-3" />
          <Link className="text-decoration-none" href={"/admin/messages"}>
            <p className="font-bold mt-3 mx-2 text-decoration-none">Messages</p>
          </Link>
        </div>{" "}
        <div className="w-100 px-3 border cursor-pointer hover:bg-black hover:text-white flex gap-1 align-center">
          <TbCircleDashedLetterP size={22} className="mt-3" />
          <Link className="text-decoration-none" href={"/admin/posts"}>
            <p className="font-bold mt-3 mx-2 text-decoration-none">Posts</p>
          </Link>
        </div>{" "}
        <div
          onClick={handleLogout}
          className="w-100 px-3 border cursor-pointer hover:bg-black hover:text-white flex gap-1 align-center"
        >
          <LogOut size={22} className="mt-3" />
          <p className="font-bold mt-3 mx-2 text-blue-500">Log out</p>
        </div>{" "}
        {/* {adminRoutes.map((link) => (
          <div
            key={link.name}
            onClick={link.action}
            className={`w-100 border px-3 ${
              pathname === link.link ? "text-white bg-black" : ""
            } cursor-pointer rounded hover:bg-black hover:text-white flex gap-1 align-center`}
          >
            <link.icon size={22} className="mt-3" />
            <p className="font-bold mt-3 mx-2">{link.name}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default AdminSidebar;
