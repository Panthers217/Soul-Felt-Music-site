import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Import your components here
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import Artist from "./components/Artist";
import Videos from "./components/Videos";
import Community from "./components/Community";
import Footer from "./components/Footer";
import Music from "./components/Music";
import Store from "./components/Store";
import About from "./components/About";
import News from "./components/News";
import Home from "./pages/Home";
import ArtistPage from "./pages/ArtistPage"; // Assuming you have this page
import ResponsiveNavbar from "./components/ResponsiveNavbar";
import ArtistOverview from "./components/ArtistOverview";
import ArtistStore from "./components/ArtistStore";
import SignUp from "./components/SignUp"; // Assuming you have a SignUp component
import Login from "./components/Login"; // Assuming you have a Login component
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* <NavBar /> */}
        <ResponsiveNavbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/store" element={<Store />} /> */}
            <Route path="/store" element={<ArtistStore />} />
            <Route path="/music" element={<Music />} />
            <Route path="/artists" element={<ArtistPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/artist/:id" element={<ArtistOverview />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
