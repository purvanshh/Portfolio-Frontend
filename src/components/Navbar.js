import React, { useState } from "react";
import "./NavbarStyle.css";
import { Link } from "react-scroll";
import {
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleCLick = () => setClick(!click);

  return (
    <nav className="header">
      <div className="logo">
        <Link
          activeClass="active"
          to="home"
          spy={true}
          smooth={true}
          duration={30}
        >
          <div className="logo-img">
            <span className="blink">&lt;</span>
            <span>&#47;</span>P<span className="blink">&gt;</span>
          </div>
        </Link>
      </div>
      <ul
        className={click ? "nav-menu active" : "nav-menu"}
        onClick={handleCLick}
      >
        <li>
          <Link
            className="navLink"
            activeClass="active"
            to="project"
            spy={true}
            smooth={true}
            duration={30}
          >Projects</Link>
        </li>
        <li>
          <Link
            className="navLink"
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            duration={30}
          >About</Link>
        </li>
        <li>
          <Link
            className="navLink"
            activeClass="active"
            to="skills"
            spy={true}
            smooth={true}
            duration={30}>Skills</Link>
        </li>
        <li>
          <Link
            className="navLink"
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            duration={30}
          >Contact</Link>
        </li>

      </ul>
      <div className={click ? "social-links active" : "social-links"}>
        <a
          href="https://www.linkedin.com/in/purvansh-sahu-25b24228a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BxTANszurROeQZKtAIMwDrQ%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin
            className="social"
            size={25}
            style={{ marginRight: "2rem" }}
          />
        </a>
        <a
          href="https://github.com/purvanshh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub
            className="social"
            size={25}
            style={{ marginRight: "2rem" }}
          />
        </a>
      </div>

      <div className="hamburger" onClick={handleCLick}>
        {click ? (
          <FaTimes className="bars" size={25} style={{ color: 'var(--text)' }} />
        ) : (
          <FaBars className="bars" size={25} style={{ color: 'var(--text)' }} />
        )}
      </div>
    </nav>
  );
}
