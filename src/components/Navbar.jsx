import React from "react";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { navLinks } from "../constants";
import {Link} from 'react-scroll'

const Navbar = () => {

  return (
    <Wrapper className="container ">
      <div className="app__navbar">
        <div className="app__navbar-logo">
          <img src={Logo} alt="app logo" />
        </div>
        <ul className="app__navbar-links">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <Link to={`${nav.id}`} spy={true} smooth={true}>{nav.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};



const Wrapper = styled.nav`
  .app__navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }

  .app__navbar-logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  ul {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  li {
    display: flex;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
    background: var(--color-yellow);
    border-radius: 80px;
    width: 100px;
    height: 34px;
    :hover {
      background: #ffe302;
    }
    :active {
      border: 1px solid #000000;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }

  a {
    display: flex;
    align-items: center;
  }
`;

export default Navbar;
