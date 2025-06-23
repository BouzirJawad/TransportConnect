import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  return (
    <header className="bg-orange-1 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl">
          TransportConnect
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to={"/profile"} className="flex items-center gap-2 text-white">
                <FaUserCircle className="text-2xl" />
                <span>{user.firstName}</span>
              </Link>
              <button
                onClick={logout}
                className="bg-white text-orange-1 font-semibold px-4 py-1 rounded hover:bg-orange-2 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="text-orange-1 bg-white p- font-semibold transition">Login</button>
            </Link>
          )}
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-gray-100">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-blue-1">
                <FaUserCircle className="text-xl" />
                <span>{user.firstName}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/")
                  setIsOpen(false);
                }}
                className="bg-orange-1 text-white font-semibold px-4 py-1 rounded hover:bg-orange-2 transition w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-blue-1 font-semibold hover:text-orange-1 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
