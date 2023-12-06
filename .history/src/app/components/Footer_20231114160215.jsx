import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>
        <Link
          href={"https://discord.gg/FJBeWWmn"}
          className="text-transparent bg-clip-text bg-gradient-to-r 
           from-red-400 via-white to-blue-600"style={{ fontSize: "24px" }}> 

         Astronaut
        </Link>
        </span>
        <p className="text-transparent bg-clip-text bg-gradient-to-r 
           from-pink-400 via-white to-blue-600"style={{ fontSize: "18px" }}>
            All rights reserved
           </p>
      </div>
    </footer>
  );
};

export default Footer;