import React from "react";
import styled from "styled-components";

const UserCard = ({ user }) => {
  return (
    <Wrapper>
      <img src={user.photo} alt={user.name}></img>
      <p>{user.name}</p>
      <div>
        <p>{user.position}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  min-width: 282px;
  border-radius: 16px;
  padding: 20px;
  height: 254px;

img {
  display: block;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
`;

export default UserCard;
