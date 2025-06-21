import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Service", href: "#service" },
    { name: "About Us", href: "#about" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  return (
    <header className="bg-orange-1 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-orange-1 font-bold text-xl">
          ShipMate
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.href.startsWith("#") ? (
                <a
                  href={link.href}
                  className="text-blue-1 hover:text-orange-1 transition"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="text-blue-1 hover:text-orange-1 transition"
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-blue-1 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-gray-100">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.href.startsWith("#") ? (
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-blue-1 hover:text-orange-1 transition"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-blue-1 hover:text-orange-1 transition"
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
