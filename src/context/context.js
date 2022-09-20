import React, { useState } from "react";

const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const count = 6;
  const totalUsers = data.total_users;
  const totalPages = Math.ceil(totalUsers / count);

  let baseUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=${count}`;

  const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };

  const fetchUsersData = async () => {
    const allData = await fetchData(`${baseUrl}`, {
      method: "GET",
    });
    setData(allData);
    setUsers(allData.users);
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage === totalPages) {
      return (baseUrl = null);
    }
  };

  // Getting position
  const fetchPositionData = async () => {
    const positionData = await fetchData(
      "https://frontend-test-assignment-api.abz.agency/api/v1/positions",
      { method: "GET" }
    );
    setPositions(positionData.positions);
  };

  // Getting token
  const fetchTokensData = async () => {
    const tokenData = await fetchData(
      "https://frontend-test-assignment-api.abz.agency/api/v1/token ",
      { method: "GET" }
    );
    setToken(tokenData.token);
  };

  // POST request
  const fetchPostData = async (formData, addedUser) => {
    await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      {
        method: "POST",
        headers: {
          Token: token,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        if (data.success) {
          fetchTokensData();
          setUsers((users) => [addedUser, ...users].slice(0, -1));
          setSubmitted(true);

          // process success response
          console.log("new user added");
        } else {
          setError(data.message);
          // proccess server errors
        }
      })
      .catch((error) => {
        // proccess network errors
      });
  };

  return (
    <UsersContext.Provider
      value={{
        positions,
        token,
        currentPage,
        data,
        users,
        totalPages,
        submitted,
        error,
        fetchPositionData,
        fetchTokensData,
        fetchData,
        fetchUsersData,
        onNext,
        fetchPostData,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider, UsersContext };
