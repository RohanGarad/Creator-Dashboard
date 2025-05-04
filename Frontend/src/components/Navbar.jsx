import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // track path change to re-render menu if needed

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setRole(parsedUser.role); // safer and reliable
    }
  }, [isAuthenticated]); // triggers when user logs in or out


  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-indigo-300 transition-all duration-200">
          <span className="text-indigo-500">Creator</span>Dashboard
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-indigo-300">Home</Link>
          <Link to="/feed" className="hover:text-indigo-300">Feed</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="hover:text-indigo-300">Dashboard</Link>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link to="/admin" className="hover:text-indigo-300">Admin Panel</Link>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 hover:text-red-500 transition-all duration-200"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="hover:text-indigo-300">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2 text-center border-t border-gray-700 pt-3">
          <Link to="/" className="block hover:text-indigo-300">Home</Link>
          <Link to="/feed" className="block hover:text-indigo-300">Feed</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="block hover:text-indigo-300">Dashboard</Link>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link to="/admin" className="block hover:text-indigo-300">Admin Panel</Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="flex justify-center items-center space-x-2 w-full hover:text-red-500 pt-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="block hover:text-indigo-300">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
