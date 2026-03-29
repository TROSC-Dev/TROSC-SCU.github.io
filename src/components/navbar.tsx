import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import TroscLogo from "../../Assests/TroscLogoRed.png";
import { Link, useLocation } from "react-router-dom";

type NavLink = {
  name: string;
  href: string;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("/#home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const hash = location.hash || "#home";
      setActiveLink(`/${hash}`);
      return;
    }

    setActiveLink(location.pathname);
  }, [location.hash, location.pathname]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    if (isOpen) setIsOpen(false);
  };

  const navLinks: NavLink[] = [
    { name: "Home", href: "/#home" },
    { name: "Tracks", href: "/#tracks" },
    { name: "Events", href: "/#events" },
    { name: "Contact us", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img
              src={TroscLogo}
              alt="Trosc Logo"
              className="h-10 w-auto"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-base font-medium transition-colors duration-300 relative ${
                  activeLink === link.href
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
                {activeLink === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-dark"></span>
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/signin"
              className="inline-block bg-primary text-white font-bold text-base py-2.5 px-2.5 rounded-md hover:bg-primary-hover transition-colors duration-300 shadow-lg cursor-pointer">
              Log In
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === link.href
                  ? "text-gray-900 bg-gray-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
