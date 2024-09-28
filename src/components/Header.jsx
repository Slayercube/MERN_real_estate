import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"} className="text-slate-500">
          <span>real-estate</span>
          <h1 className="font-bold text-sm sm-text-xl flex flex-wrap"></h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>

        <ul className="flex gap-4">
          <Link to={"/"} className="text-slate-700 hover:underline">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          <Link to={"/about"} className="text-slate-700 hover:underline">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to={"/signin"} className="text-slate-700 hover:underline">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              SignIn
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};
export default Header;
