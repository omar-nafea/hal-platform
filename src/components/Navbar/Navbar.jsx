import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className=" fixed top-0 right-0 left-0 z-50"
      style={{
        backgroundImage: `url(./src/assets/images/bghero.jpg)`,
        fontStyle: "bold",
        fontFamily:
          "Cairo, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <nav className=" bg-transparent">
        <div className=" flex container mx-auto  justify-around items-center p-5 main-text ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white  text-2xl "
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <ul
            className={`flex-col-reverse mt-7 items-center  md:flex-row md:flex gap-6 absolute md:static top-16 right-0 bg-[var(--bg-main)] md:bg-transparent w-full md:w-auto p-5 md:p-0 transition-all duration-300 ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <li>
              <Link to="/register">
                <div className="bg-contact rounded-3xl p-2 mr-24 flex items-center justify-center w-full md:w-fit">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--bg-main)] rounded-full main-text">
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                  <span className="ml-2 text-contact ">تواصل معنا</span>
                </div>
              </Link>
            </li>

            <li>
              <NavLink to="/showIdea">اعرض فكرتك</NavLink>
            </li>
            <li>
              <NavLink to="/works">أعمالنا </NavLink>
            </li>
            <li>
              <NavLink to="/services">خدماتنا</NavLink>
            </li>
            <li>
              <NavLink to="/about">من نحن</NavLink>
            </li>
            <li>
              <NavLink to="/">الرئيسية</NavLink>
            </li>
          </ul>
          <Link to="/">
            <img className="pt-3" src= "./src/assets/images/7al-logo.png" width={300} alt="" />
          </Link>
        </div>
        <div></div>
      </nav>
    </div>
  );
}
