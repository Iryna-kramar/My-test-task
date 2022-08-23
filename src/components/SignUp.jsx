import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { navLinks } from "../constants";
import { fetchData, dataPostOptions, getToken } from "../fetchData/fetchData";
// import Button from "./Button";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  UploadButton,
  Stack,
} from "./index";

const SignUp = () => {
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position_id, setPosition_id] = useState("");
  const [photo, setPhoto] = useState("");
  const [token, setToken] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling values change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };

  const handlePosition = (e) => {
    setPosition_id(e.target.value);
    setSubmitted(false);
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, phone, position_id, photo };

    const fetchTokensData = async () => {
      const tokenData = await fetchData(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token ",
        { method: "GET" }
      );
      setToken(tokenData.token);
    };
    fetchTokensData();

    console.log(token, "1token");

    const fetchPositionIdData = async () => {
      const positionIdData = await fetchData(
        "https://frontend-test-assignment-api.abz.agency/api/v1/positions",
        { method: "GET" }
      )
        .then((response) => {
          response.json();
        })
        .then((data) => {
          console.log(data);
        });
    };

    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      position_id === "" ||
      photo === ""
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      console.log(user, "new user");

      fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
        method: "POST",
        headers: {
          Token: token,
        },
        body: user,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            console.log("new user added");
            // process success response
          } else {
            console.log("error");
            // proccess server errors
          }
        })
        .catch((error) => {
          // proccess network errors
        });
    }
  };

  return (
    <div className="container">
      <Wrapper>
        <h1>Working with POST request</h1>
        <form className="signUpForm" onSubmit={handleSubmit}>
          <div className="inputInfo">
            <TextField
              onChange={handleName}
              label="Your name"
              value={name}
              type="text"
            />

            <TextField
              onChange={handleEmail}
              label="Email"
              value={email}
              type="email"
            />

            <TextField
              onChange={handlePhone}
              helperText="+38 (XXX) XXX - XX - XX"
              label="Phone"
              value={phone}
              type="phone"
            />
          </div>

          <FormControl className="position">
            <FormLabel id="demo-radio-buttons-group-label">
              Select your position
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={handlePosition}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Frontend developer"
                checked={position_id === "1"}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Backend developer"
                checked={position_id === "2"}
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Designer"
                checked={position_id === "3"}
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="QA"
                checked={position_id === "4"}
              />
            </RadioGroup>
          </FormControl>

          <div className="uploadPhoto">
            <Stack direction="row" alignItems="center" spacing={2}>
              <UploadButton
                sx={{
                  width: "83px",
                  height: "56px",
                  border: "1px solid rgba(0, 0, 0, 0.87)",
                  borderRadius: "4px 0px 0px 4px",
                  textAlign: "center",
                  padding: "14px",
                  fontFamily: "Nunito",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "26px",
                  textTransform: "none",
                  color: "rgba(0, 0, 0, 0.87)",
                  "&:hover": {
                    border: "1px solid rgba(0, 0, 0, 0.87)",
                  },
                }}
                variant="outlined"
                component="label"
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handlePhoto}
                />
              </UploadButton>
              <span>Upload your photo</span>
            </Stack>
          </div>
          <div className="submitBtn">
            <Button type="submit">{navLinks[1].title}</Button>
          </div>
        </form>
      </Wrapper>

      {/* 

        // Showing success message
  //   const successMessage = () => {
  //     return (
  //       <div
  //         className="success"
  //         style={{
  //           display: submitted ? "" : "none",
  //         }}
  //       >
  //         <h1>User {name} successfully registered!!</h1>
  //       </div>
  //     );
  //   };

  //   // Showing error message if error is true
  //   const errorMessage = () => {
  //     return (
  //       <div
  //         className="error"
  //         style={{
  //           display: error ? "" : "none",
  //         }}
  //       >
  //         <h1>Please enter all the fields</h1>
  //       </div>
  //     );
  //   };
        Calling to the methods
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div> */}
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
    padding-top: 50px;
  }
  .inputInfo {
    display: flex;
    flex-direction: column;
    gap: 50px;
    div {
      @media (min-width: 360px) {
        width: 328px;
      }
      @media screen and (min-width: 768px) {
        width: 380px;
      }
    }
  }

  .position {
    padding-top: 25px;
  }

  .uploadPhoto {
    margin: 47px 0 50px 0;
    border: 1px solid #d0cfcf;
    border-radius: 4px;
  }
  span {
    color: #7e7e7e;
  }
  .submitBtn {
    display: flex;
    justify-content: center;
  }
`;
export default SignUp;
