import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import UserCard from "./UserCard";
import Loader from "./Loader";
import { UsersContext } from "../context/context";

const Users = () => {
  const { users, currentPage, totalPages, onNext, fetchUsersData } =
    useContext(UsersContext);

  useEffect(() => {
    fetchUsersData();
  }, [currentPage]);

  return (
    <div className="container">
      <Wrapper id="users">
        <h1>Working with GET request</h1>
        {users.length !== "0" ? (
          <div className="userCards">
            {users
              .sort((a, b) => b.id - a.id)
              .map((user, index) => (
                <UserCard key={index} user={user} />
              ))}
          </div>
        ) : (
          <Loader />
        )}
        <div className="centerButton">
          <Button
            onClick={onNext}
            style={{
              display: currentPage === totalPages ? "none" : "",
            }}
          >
            Show more
          </Button>
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 140px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .userCards {
    padding: 50px 0;
    display: grid;

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 29px;
    }

    @media screen and (max-width: 1023px) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
    }

    @media screen and (max-width: 767px) {
      justify-items: center;
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }
  }
`;

export default Users;
