import React from "react";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { navLinks } from "../constants";
import { Link } from "react-scroll";
import Button from "./Button";

const Navbar = () => {
  return (
    <Wrapper style={{ background: "#fff" }}>
      <div className="container app__navbar">
        <div className="app__navbar-logo">
          <img src={Logo} alt="app logo" />
        </div>
        <div className="app__navbar-links">
          {navLinks.map((nav) => (
            <Link key={nav.id} to={`${nav.id}`} spy={true} smooth={true}>
              <Button>{nav.title}</Button>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  .app__navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .app__navbar-logo {
    display: flex;
    justify-content: flex-start;
  }

  .app__navbar-links {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    button {
      display: flex;
      justify-content: center;
      margin: 13px 0 13px 10px;
      :active {
        border: 1px solid #000000;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

export default Navbar;
