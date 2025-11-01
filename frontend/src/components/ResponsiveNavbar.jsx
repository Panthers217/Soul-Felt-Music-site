import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState } from "react";
import { useApiData } from "../context/ApiDataContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function ResponsiveNavbar() {
  const { websiteUser } = useApiData();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const MobileTabletNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    return (
      <nav className="bg-[#0c0504] w-full">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <span className="text-[#e6cfa7] text-xs tracking-widest">SOULFELT</span>
            <span className="text-[#e6cfa7] text-lg font-medium tracking-widest">MUSIC</span>
            <div className="w-20 h-1 bg-[#f7c900] mt-1 mb-1" />
            <span className="text-[#e6cfa7] text-[7px] tracking-widest">FEEL THE VIBES</span>
          </div>
          {/* Hamburger */}
          <button
            className="text-[#e6cfa7] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <rect y="8" width="32" height="2" rx="1" fill="#e6cfa7" />
              <rect y="15" width="32" height="2" rx="1" fill="#e6cfa7" />
              <rect y="22" width="32" height="2" rx="1" fill="#e6cfa7" />
            </svg>
          </button>
        </div>
        {/* Menu */}
        {menuOpen && (
          <div className="bg-[#0c0504] border-t border-[#1a1312] w-full">
            <ul className="flex flex-col py-2 px-4 space-y-3 text-[#e6cfa7] text-base">
              <Link to="/">Home</Link>
              <Link to="/store">Store</Link>
              <Link to="/music">Music</Link>
              <Link to="/artists">Artists</Link>
              {/* <Link to="/news">News</Link> */}
              <Link to="/videos">Videos</Link>
              <Link to="/community">Community/News</Link>
              <Link to="/contact">Contact</Link>
              {websiteUser?.isAdmin && (
                <>
                  <Link to="/admin/dashboard" className="text-[#f7c900] font-semibold">🔧 Admin Dashboard</Link>
                  <Link to="/admin/newsletter" className="text-[#f7c900] font-semibold">📧 Newsletter</Link>
                  <Link to="/admin/faq" className="text-[#f7c900] font-semibold">❓ FAQ Management</Link>
                </>
              )}
            </ul>
            <div className="px-4 pb-4">
              <div className="border border-[#1a1312] rounded-md p-3 w-40 flex flex-col gap-2">
                {websiteUser ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#c90036] flex items-center justify-center">
                        <span className="text-[#e6cfa7] font-bold text-sm">
                          {websiteUser.email?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#e6cfa7] text-xs truncate max-w-[100px]">
                          {websiteUser.email}
                        </span>
                      </div>
                    </div>
                    <Link 
                      to="/purchase-history"
                      className="text-[#e6cfa7] text-base hover:text-[#f7c900] transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Purchases
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="text-[#c90036] text-base hover:text-[#1976d2] transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/sign-up" className="text-[#1976d2] text-base">Sign Up</Link>
                    <Link to="/login" className="text-[#1976d2] text-base">Login</Link>
                  </>
                )}
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border border-[#c90036] rounded-full px-3 py-1 text-[#e6cfa7] w-full text-sm focus:outline-none"
                  />
                  <span className="absolute right-2 top-1.5">
                    <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                      <circle cx="8" cy="8" r="7" stroke="#c90036" strokeWidth="2" />
                      <line x1="13" y1="13" x2="17" y2="17" stroke="#c90036" strokeWidth="2" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  };

  const DesktopNavbar = () => {
    return (
      <nav className="bg-[#1a0b0d] w-full flex items-center flex-wrap">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center px-6 py-2 bg-[#0c0504]" style={{ minWidth: 145 }}>
          <span className="text-[#e6cfa7] text-xs tracking-widest">SOULFELT</span>
          <span className="text-[#e6cfa7] text-lg font-medium tracking-widest">MUSIC</span>
          <div className="w-28 h-1 bg-[#f7c900] mt-1 mb-1" />
          <span className="text-[#e6cfa7] text-[7px] tracking-widest">FEEL THE VIBES</span>
        </div>
        {/* Nav Links */}
        <ul className="flex-1 flex justify-center items-center gap-[1rem] md:gap-[1rem] xl:gap-16 lg:text-md xl:text-[1.5rem] text-[#e6cfa7] xl:text-lg text-[1rem] font-normal">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/music">Music</Link>
          <Link to="/artists">Artists</Link>
          {/* <Link to="/news">News</Link> */}
          <Link to="/videos">Videos</Link>
          <Link to="/community">Community/News</Link>
          <Link to="/contact">Contact</Link>
          {websiteUser?.isAdmin && (
            <>
              <Link to="/admin/dashboard" className="text-[#f7c900] font-semibold">🔧 Admin</Link>
              <Link to="/admin/newsletter" className="text-[#f7c900] font-semibold">📧 Newsletter</Link>
              <Link to="/admin/faq" className="text-[#f7c900] font-semibold">❓ FAQ</Link>
            </>
          )}
        </ul>
        {/* Auth/Search Section */}
        <div className="flex items-center gap-6 px-6 py-2 bg-[#1a0b0d]" style={{ minWidth: 220 }}>
          {websiteUser ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c90036] flex items-center justify-center">
                  <span className="text-[#e6cfa7] font-bold text-lg">
                    {websiteUser.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#e6cfa7] text-sm font-medium truncate max-w-[120px]">
                    {websiteUser.email}
                  </span>
                  <Link 
                    to="/purchase-history"
                    className="text-[#e6cfa7] text-xs hover:text-[#f7c900] transition-colors text-left flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    My Purchases
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-[#c90036] text-xs hover:text-[#1976d2] transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/sign-up" className="text-[#1976d2] text-lg font-medium">Sign Up</Link>
              <Link to="/login" className="text-[#1976d2] text-lg font-medium">Login</Link>
            </>
          )}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border border-[#c90036] rounded-full px-3 py-1 text-[#e6cfa7] w-24 text-sm focus:outline-none"
            />
            <span className="absolute right-2 top-1.5">
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                <circle cx="8" cy="8" r="7" stroke="#c90036" strokeWidth="2" />
                <line x1="13" y1="13" x2="17" y2="17" stroke="#c90036" strokeWidth="2" />
              </svg>
            </span>
          </div>
        </div>
      </nav>
    );
  };
  

  return (
    <>
      {/* Mobile & Tablet: <lg */}
      <div className="block lg:hidden xl:hidden">
        <MobileTabletNavbar />
      </div>
      {/* Desktop & Laptop: lg+ */}
      <div className="hidden lg:flex xl:flex">
        <DesktopNavbar />
      </div>
      {/* <div className="hidden lg:flex xl:hidden">
        <LaptopNavbar />
      </div>   */}
    </>
  );
}