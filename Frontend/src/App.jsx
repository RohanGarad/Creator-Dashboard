import './index.css'; 
import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FeedPage from "./pages/FeedPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./components/AdminPanel";
import { AuthContext } from "./context/AuthContext"; // Import the AuthContext to handle auth states
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const { user, setUser } = useContext(AuthContext); // Using context for user state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // ✅ Check token presence or validate with backend
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // or use token validation
  }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    <Navigate to="/login" />;
  };  
  
  useEffect(() => {
    // Check if the user is authenticated based on token (or JWT)
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user"); // example check, replace with real logic
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set the user if logged in
      }
    };
    
    checkAuth();
  }, [setUser]);
  
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
      <Navbar isAuthenticated={user !== null} onLogout={handleLogout} />

        <div className="container mx-auto px-4 py-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<FeedPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />

            {/* Protected Routes (Based on Authentication) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={user && user.role === "admin" ? <AdminPanel /> : <Login />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;