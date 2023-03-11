import React from "react";
import github from "../public/github.svg";
import logoIG from "../public/logoIG.svg";
import Image from "next/image";

function Navbar() {
  return (
    <div className="navbar">
      <Image alt="Logo" src={logoIG} />
      <a target={"_blank"} href="https://github.com/uibahy/sentence-rephraser">
        <Image alt="Github" src={github} />
        <span className="sm:hidden">Start on Github</span>
      </a>
    </div>
  );
}

export default Navbar;
