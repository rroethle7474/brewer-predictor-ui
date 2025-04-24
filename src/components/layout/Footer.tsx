import React from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/rules", label: "Rules" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="w-full bg-blue-900 text-yellow-400 py-6 mt-8 border-t border-yellow-600"
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 20px)',
      }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <nav className="flex space-x-6 mb-4 md:mb-0">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-yellow-300 font-medium transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-yellow-300 text-center md:text-right">
          &copy; {new Date().getFullYear()} Brewers Prediction Game. Not affiliated with MLB or the Milwaukee Brewers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;