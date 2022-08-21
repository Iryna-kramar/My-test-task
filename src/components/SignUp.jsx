import React from "react";
import styled from "styled-components";
import { navLinks } from "../constants";
import Button from "./Button";

const SignUp = () => {
  return (
    <div className="container">
      <Wrapper>
        <h1>Working with POST request</h1>
        <form>
          <input type="text" placeholder="Login" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Password" />

          <Button type="submit">{navLinks[1].title}</Button>
        </form>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 140px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  form {
    padding-top: 50px 0;
  }
`;
export default SignUp;
