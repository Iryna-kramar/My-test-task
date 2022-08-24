import React from "react";
import styled from "styled-components";
import Button from "./Button";
import headerImg from "../assets/header_image.jpg";
import { headerTitles, navLinks } from "../constants";


const Header = () => {
  return (
    <Wrapper>
      <div>
        <h1>{headerTitles[0].title}</h1>
        <p>{headerTitles[1].subtitle}</p>
        <Button>{navLinks[1].title}</Button>
      </div>
    </Wrapper>
  );
};



const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: url(${headerImg}) no-repeat center / cover;
  background-repeat: no-repeat;

  @media (min-width: 360px) {
    min-height: 500px;
  }
  @media screen and (min-width: 1024px) {
    min-height: 650px;
  }
  div {
    flex-basis: 100%;
    align-self: center;
    text-align: center;
    color: #fff;
    @media (min-width: 360px) {
      max-width: 328px;
    }
    @media screen and (min-width: 768px) {
      max-width: 380px;
    }
  }
  p {
    padding: 21px 0 32px;
  }
`;

export default Header;
