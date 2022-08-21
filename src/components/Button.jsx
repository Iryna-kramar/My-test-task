import React from "react";
import styled from "styled-components";


const Button = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  cursor: pointer;
  background: var(--color-yellow);
  border-radius: 80px;
  width: 100px;
  height: 34px;
  border: none;
  font-size: 16px;
  line-height: 26px;
  :hover {
    background: #ffe302;
  }
  :disabled {
    background: #b4b4b4;
  }
`;
export default Button;
