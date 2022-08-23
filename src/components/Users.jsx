import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dataOptions, fetchData } from "../fetchData/fetchData";
import Button from "./Button";
import UserCard from "./UserCard";


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const allData = await fetchData(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6 ",
        {method: "GET"}
      );
      setUsers(allData.users);
    };
    fetchUsersData();
  }, []);

  console.log(users, "data2");

  return (
    <div className="container">
      <Wrapper>
        <h1>Working with GET request</h1>
        <div className="userCards">
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
        <Button>Show more</Button>
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

  .userCards {
    padding: 50px 0;
    display: grid;

    @media (min-width: 360px) {
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }

    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 29px;
    }
  }
`;

export default Users;
