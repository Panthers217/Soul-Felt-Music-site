import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const socialLinks = [
  { icon: <FaFacebookF />, url: "https://facebook.com/soulfeltmusic", label: "Facebook" },
  { icon: <FaTwitter />, url: "https://twitter.com/soulfeltmusic", label: "Twitter" },
  { icon: <FaInstagram />, url: "https://instagram.com/soulfeltmusic", label: "Instagram" },
  { icon: <FaYoutube />, url: "https://youtube.com/soulfeltmusic", label: "YouTube" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Store", to: "/store" },
  { label: "Artists", to: "/artists" },
  { label: "Music", to: "/music" },
  { label: "Videos", to: "/videos" },
  { label: "Community", to: "/community" },
];
const supportLinks = [
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "Terms", to: "/terms" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");
    // Simulate async submit
    setTimeout(() => {
      if (email.match(/^\S+@\S+\.\S+$/)) {
        setFeedback("Thank you for subscribing!");
        setEmail("");
      } else {
        setFeedback("Please enter a valid email address.");
      }
      setSubmitting(false);
    }, 900);
  };

  return (
    <footer className="bg-[#120c0a] text-[#fffced] pt-8 pb-4 px-2">
      <div className="max-w-7xl mx-auto border border-[#231f1c] rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
        {/* Left column */}
        <div className="flex-1 mb-6 md:mb-0">
          <span className="text-[#aa2a46] text-2xl font-bold">Soul Felt Music</span>
          <p className="mt-6 mb-0">
            Experience the soul of music with us.<br />
            Join our community of music lovers.
          </p>
        </div>
        {/* Quick Links */}
        <div className="flex-1 flex flex-col md:ml-8 mb-6 md:mb-0">
          <div className="font-bold text-[#aa2a46] mb-2">Quick Links</div>
          <ul className="space-y-1">
            {quickLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="hover:text-[#aa2a46] focus:text-[#aa2a46] transition-colors underline-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Support & Social */}
        <div className="flex-1 flex flex-col md:ml-8 mb-6 md:mb-0">
          <div className="font-bold text-[#aa2a46] mb-2">Support</div>
          <ul className="space-y-1 mb-3">
            {supportLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="hover:text-[#aa2a46] focus:text-[#aa2a46] transition-colors underline-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="font-bold text-[#aa2a46] mb-2">Follow Us</div>
          <div className="flex gap-3 text-2xl">
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hover:text-[#aa2a46] focus:text-[#aa2a46] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Newsletter */}
        <div className="flex-1 flex flex-col md:ml-8">
          <div className="font-bold text-[#aa2a46] mb-2">Soul Felt Music Newsletter</div>
          <p className="mb-3">Subscribe to our newsletter<br />for the latest updates.</p>
          <form className="flex flex-col gap-3" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="rounded-md px-4 py-2 bg-[#231f1c] text-[#232b2d] font-semibold focus:outline-none"
              disabled={submitting}
            />
            <button
              type="submit"
              className="rounded-full border border-blue-400 text-green-400 py-2 transition hover:bg-blue-400 hover:text-white"
              disabled={submitting}
            >
              {submitting ? "Subscribing..." : "Subscribe"}
            </button>
            {feedback && (
              <div className={`text-sm mt-1 ${feedback.includes("Thank") ? "text-green-400" : "text-red-400"}`}>{feedback}</div>
            )}
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-4 text-xs text-[#fffced]">
        © 2024 Soul Felt Music. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;