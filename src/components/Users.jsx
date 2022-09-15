import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../fetchData/fetchData";
import Button from "./Button";
import UserCard from "./UserCard";
import Loader from "./Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const count = 6;
  const totalUsers = data.total_users;
  const totalPages = Math.ceil(totalUsers / count);

  let baseUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=${count}`;

  const onNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage === totalPages) {
      return (baseUrl = null);
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      const allData = await fetchData(`${baseUrl}`, {
        method: "GET",
      });
      setData(allData);
      setUsers(allData.users);
    };
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
        <div className="centerButton" >
        <Button onClick={onNext} disabled={currentPage === totalPages}>
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
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }
  }
 
`;

export default Users;
