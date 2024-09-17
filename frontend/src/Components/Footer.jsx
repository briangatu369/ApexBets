import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const connectLinks = [
  {
    name: "Linkedin",
    Icon: FaLinkedin,
    link: "https://www.linkedin.com/in/brian-gatundu-009589262",
  },
  {
    name: "Twitter",
    Icon: FaSquareXTwitter,
    link: "https://x.com/briangatundu369",
  },
];

const Footer = () => {
  return (
    <div className="absolute  bottom-0 left-0 right-0 flex justify-between items-center bg-secondary p-4 rounded-t-sm">
      <div>
        <p className="flex gap-1 text-sm tracking-wide items-center">
          <span>&#169;</span>
          <span>ApexBets. All rights reserved</span>
        </p>
      </div>

      <div className="flex gap-3 ">
        {connectLinks.map((connection) => {
          const { name, link, Icon } = connection;
          return (
            <a key={name} target="_blank" rel="noopener noreferrer" href={link}>
              <Icon size={25} className="text-purple-1" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
