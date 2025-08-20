import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => (
  <footer className="bg-[#120c0a] text-[#fffced] pt-8 pb-4 px-2">
    <div className="max-w-7xl mx-auto border border-[#231f1c] rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
      {/* Left column */}
      <div className="flex-1 mb-6 md:mb-0">
        <span className="text-[#aa2a46]">s</span>
        <p className="mt-6 mb-0">
          Experience the soul of music with us.<br />
          Join our community of music lovers.
        </p>
      </div>
      {/* Quick Links */}
      <div className="flex-1 flex flex-col md:ml-8 mb-6 md:mb-0">
        <div className="font-bold text-[#aa2a46] mb-2">Quick Links</div>
        <ul className="space-y-1">
          <li>Home</li>
          <li>Store</li>
          <li>Artists</li>
          <li>News</li>
          <li>Videos</li>
          <li>Community</li>
        </ul>
      </div>
      {/* Support & Social */}
      <div className="flex-1 flex flex-col md:ml-8 mb-6 md:mb-0">
        <div className="font-bold text-[#aa2a46] mb-2">Support</div>
        <ul className="space-y-1 mb-3">
          <li>Contact</li>
          <li>FAQ</li>
          <li>Terms</li>
        </ul>
        <div className="font-bold text-[#aa2a46] mb-2">Follow Us</div>
        <div className="flex gap-3 text-2xl">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>
      </div>
      {/* Newsletter */}
      <div className="flex-1 flex flex-col md:ml-8">
        <div className="font-bold text-[#aa2a46] mb-2">Soul Felt Music Newsletter</div>
        <p className="mb-3">Subscribe to our newsletter<br />for the latest updates.</p>
        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email address"
            className="rounded-md px-4 py-2 bg-[#231f1c] text-[#232b2d] font-semibold focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full border border-blue-400 text-green-400 py-2 transition hover:bg-blue-400 hover:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-4 text-xs text-[#fffced]">
      © 2024 Soul Felt Music. All rights reserved.
    </div>
  </footer>
);

export default Footer;