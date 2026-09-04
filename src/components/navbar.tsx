import React, { useEffect, useState } from "react";
import { Menu, X, LogOut, UserCircle } from "lucide-react";
import TroscLogo from "../../Assests/TroscLogoRed.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { smoothScrollToId } from "../utils/smoothScroll";
import { useAuth } from "../context/useAuth";

type NavLink = {
  name: string;
  href: string;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("/#home");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveLink(location.pathname);
      return;
    }

    const hash = location.hash || "#home";
    setActiveLink(`/${hash}`);

    const sections = ["home", "tracks", "events", "upcoming-events"];

    const handleScroll = () => {
      let current = "home";
      let closestTop = -Infinity;

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.top > closestTop) {
            closestTop = rect.top;
            current = id;
          }
        }
      }

      // When the page is scrolled to the very bottom, the last section's
      // top edge may never reach the 200px threshold — activate it explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
      if (atBottom) {
        current = sections[sections.length - 1];
      }

      setActiveLink((prev) => {
        const newHref = `/#${current}`;
        return prev !== newHref ? newHref : prev;
      });
    };

    // Only run the position check immediately when there is NO hash target.
    // When a hash is present we already set the correct link above; calling
    // handleScroll() now would fire before the page has scrolled and would
    // immediately reset the active link back to whatever section is at the top.
    if (!location.hash) {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.hash, location.pathname]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setActiveLink(href);
    if (isOpen) setIsOpen(false);

    // Only intercept same-page hash links (e.g. /#tracks, /#events)
    if (href.startsWith("/#")) {
      e.preventDefault(); // Stop the browser from doing an instant jump

      const id = href.replace("/#", "");

      if (location.pathname === "/") {
        // Already on home — scroll with our custom rAF scroller
        smoothScrollToId(id);
        // Keep the URL in sync without triggering navigation
        window.history.pushState(null, "", href);
      } else {
        // On a different page — navigate first, then useScrollToHash
        // will handle the smooth scroll after the route renders
        navigate(href);
      }
    }
    // Non-hash links (/contact, /signin) fall through to normal Link behavior
  };

  const navLinks: NavLink[] = [
    { name: "Home", href: "/#home" },
    { name: "Tracks", href: "/#tracks" },
    { name: "Events", href: "/#events" },
    { name: "Up-Coming Events", href: "/#upcoming-events" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img src={TroscLogo} alt="Trosc Logo" className="h-10 w-auto" />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
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
            {!loading && user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-primary transition-colors"
                >
                  <UserCircle size={20} className="text-primary" />
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 font-bold text-sm py-2.5 px-3 rounded-md hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="inline-block bg-primary text-white font-bold text-base py-2.5 px-2.5 rounded-md hover:bg-primary-hover transition-colors duration-300 shadow-lg cursor-pointer"
              >
                Log In
              </Link>
            )}
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
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === link.href
                  ? "text-gray-900 bg-gray-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {!loading && user && (
            <div className="flex items-center justify-between px-3 py-2">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-primary transition-colors"
              >
                <UserCircle size={20} className="text-primary" />
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 font-bold text-sm py-2 px-3 rounded-md hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
