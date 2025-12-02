"use client";

import { IoCartOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import Link from "next/link";
import "./Header.scss";

import { useAppDispatch, useAppSelector } from "@/(redux)/hooks";
import { setSearchValue } from "@/(redux)/(slices)/SearchSilce";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.value);

  return (
    <div className="bigWrapper">
      <div className="header-container">
        <div className="leftPart">
          <Link href={"/"}>
            <img src="/logo.png" alt="logo" className="cursor-pointer" />
          </Link>

          <ul className={menuOpen ? "open" : ""}>
            <Link href="/" className="text-decoration-none">
              <li>Bosh sahifa</li>
            </Link>
            <Link href="/mahsulotlar" className="text-decoration-none">
              <li>Mahsulotlar</li>
            </Link>
            <Link href="/aloqa" className="text-decoration-none">
              <li>Aloqa</li>
            </Link>
            <Link href="/blog" className="text-decoration-none">
              <li>Blog</li>
            </Link>
            {/* <Link href="/sign-up" className="text-decoration-none">
              <li>Admin</li>
            </Link> */}
          </ul>
        </div>

        <div className="rightPart">
          <div className="searchWrapper">
            <input
              type="search"
              placeholder="Search for products"
              value={searchValue}
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
            />
            <div className="searchIcon">
              <CiSearch />
            </div>
          </div>

          <Link href={"/order"}>
            <IoCartOutline className="logocha" />
          </Link>

          <div className="hamburger">
            <div onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </div>

            {menuOpen && (
              <ul className="mobileMenu">
                <Link href="/" className="text-decoration-none">
                  <li>Bosh sahifa</li>
                </Link>
                <Link href="/mahsulotlar" className="text-decoration-none">
                  <li>Mahsulotlar</li>
                </Link>
                <Link href="/aloqa" className="text-decoration-none">
                  <li>Aloqa</li>
                </Link>
                <Link href="/blog" className="text-decoration-none">
                  <li>Blog</li>
                </Link>
                {/* <Link href="/adminPanel" className="text-decoration-none">
                  <li>Admin</li>
                </Link> */}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="lineLong"></div>
    </div>
  );
};

export default Header;
