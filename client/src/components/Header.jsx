import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const urlParams = new URLSearchParams(window.location.search);
    // urlParams.set("searchTerm", searchTerm);
    // const searchQuery = urlParams.toString();
    // navigate(`/search?${searchQuery}`);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    if (searchTermFormUrl) {
      setSearchTerm(searchTermFormUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"} className="text-slate-500">
          <span>real-estate</span>
          <h1 className="font-bold text-sm sm-text-xl flex flex-wrap"></h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="text-slate-500">
            <FaSearch className="text-slate-500" />
          </button>
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

          <Link to={"/profile"} className="text-slate-700 hover:underline">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <li className="hidden sm:inline text-slate-700 hover:underline">
                SignIn
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
