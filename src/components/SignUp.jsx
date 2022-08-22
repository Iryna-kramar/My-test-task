import React, { useState } from "react";
import styled from "styled-components";
import { navLinks } from "../constants";
import TextField from "@mui/material/TextField";
import Button from "./Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import UploadButton from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const SignUp = () => {
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };

  const handlePosition = (e) => {
    setPosition(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, phone, position };
    if (name === "" || email === "" || phone === "" || position === "") {
      setError(true);
      console.log(user);
    } else {
      setSubmitted(true);
      setError(false);

      console.log(user);
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
                value="Frontend developer"
                control={<Radio />}
                label="Frontend developer"
                checked={position === "Frontend developer"}
              />
              <FormControlLabel
                value="Backend developer"
                control={<Radio />}
                label="Backend developer"
                checked={position === "Backend developer"}
              />
              <FormControlLabel
                value="Designer"
                control={<Radio />}
                label="Designer"
                checked={position === "Designer"}
              />
              <FormControlLabel
                value="QA"
                control={<Radio />}
                label="QA"
                checked={position === "QA"}
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
                <input hidden accept="image/*" multiple type="file" />
              </UploadButton>
              <span>Upload your photo</span>
            </Stack>
          </div>
          <div className="submitBtn">
            <Button disabled type="submit">{navLinks[1].title}</Button>
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
