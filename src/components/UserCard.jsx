import React from "react";
import styled from "styled-components";

const UserCard = ({ user }) => {
  return (
    <Wrapper>
      <img src={user.photo} alt={user.name}></img>
      <div className="userInfo">
        <p className={user.name.length >= 32 ? "ellipsis" : ""}>
          {user.name}
        </p>
        <p>{user.position}</p>
        <p className={user.email.length >= 32 ? "ellipsis" : ""}>
          {user.email}
        </p>
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
  min-width: 328px;
  border-radius: 16px;
  padding: 20px;
  height: 254px;

  img {
    display: block;
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }

  .userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userInfo p:first-child {
    margin-bottom: 1rem;
  }

  .ellipsis {
    width: 282px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ellipsis:hover {
   overflow:visible;
   }

`;

export default UserCard;
