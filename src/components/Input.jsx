import React from "react";
import styled from "styled-components";


const Input = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

const Wrapper = styled.input`
  box-sizing: border-box;
  height: 56px;
  padding-left: 16px;
  border: 1px solid #d0cfcf;
  border-radius: 4px;

  color: #7e7e7e;
  font-size: 16px;
  line-height: 26px;

  @media (min-width: 360px) {
    width: 328px;
  }
  @media screen and (min-width: 768px) {
    width: 380px;
  }
`;
export default Input;
