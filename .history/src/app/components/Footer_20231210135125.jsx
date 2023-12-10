import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>
        <Link
          href={"https://devpost.com/submit-to/19229-constellation-a-chainlink-hackathon/manage/submissions/457844-save-patrick-from-oblivion/finalization"}
          className="text-transparent bg-clip-text bg-gradient-to-r 
           from-pink-400 via-white to-purple-600"style={{ fontSize: "24px" }}> 

         Save Patrick from Oblivion
        </Link>
        </span>
        <p className="text-transparent bg-clip-text bg-gradient-to-r 
           from-pink-400 via-white to-purple-600"style={{ fontSize: "18px" }}>
            All rights reserved
           </p>
      </div>
    </footer>
  );
};

export default Footer;