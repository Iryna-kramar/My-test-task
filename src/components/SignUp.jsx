import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import successImg from "../assets/success-image.svg";
import { navLinks, inputField } from "../constants";
import { UsersContext } from "../context/context";
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
  Alert,
} from "./index";

const SignUp = () => {
  const { positions, submitted, error } = React.useContext(UsersContext);
  const { fetchPositionData, fetchTokensData, fetchPostData } =
    useContext(UsersContext);

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position_id, setPosition_id] = useState("");
  const [photo, setPhoto] = useState("");
  const [Url, setUrl] = useState("");

  // Getting position
  useEffect(() => {
    fetchPositionData();
  }, []);

  // Getting token
  useEffect(() => {
    fetchTokensData();
  }, []);

  // Handling values change
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value.toLowerCase());
  };

  const handlePhone = (e) => {
    setPhone(e.target.value.replace(/\s/g, "", "-"));
  };

  const handlePosition = (e) => {
    setPosition_id(e.target.value);
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, phone, position_id, photo, Url };

    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      position_id === "" ||
      photo === "" ||
      Url === ""
    ) {
      error(true);
    } else {
      const addedUser = { name, email, phone, position_id, photo: Url };
      console.log(addedUser, "added User");

      const formData = new FormData();
      for (const name in newUser) {
        formData.append(name, newUser[name]);
      }
      console.log(formData, "formData");
      fetchPostData(formData, addedUser);
    }
  };

  return (
    <div className="container">
      <Wrapper id="signUp">
        {submitted ? (
          // Showing success message
          <div
            className="success"
            style={{
              display: submitted ? "" : "none",
            }}
          >
            <h1>User successfully registered!</h1>
            <img src={successImg} alt="success" />
          </div>
        ) : (
          <div>
            <h1>Working with POST request</h1>
            <form className="signUpForm" onSubmit={handleSubmit}>
              <div className="inputInfo">
                <TextField
                  onChange={handleName}
                  label={inputField[0].lable}
                  value={name}
                  type={inputField[0].type}
                />

                <TextField
                  onChange={handleEmail}
                  label={inputField[1].lable}
                  value={email}
                  type={inputField[1].type}
                />

                <TextField
                  onChange={handlePhone}
                  helperText="+38 XXX XXX XX XX"
                  label={inputField[2].lable}
                  value={phone}
                  type={inputField[2].type}
                />
              </div>

              <FormControl className="position">
                <FormLabel
                  sx={{ color: "#7e7e7e" }}
                  id="demo-radio-buttons-group-label"
                >
                  Select your position
                </FormLabel>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={handlePosition}
                >
                  {positions.map((position) => (
                    <FormControlLabel
                      key={position.id}
                      value={position.id}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "var(--color-blue)",
                            },
                          }}
                        />
                      }
                      label={position.name}
                    />
                  ))}
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
              <div className="centerButton">
                <Button
                  type="submit"
                  disabled={
                    name === "" ||
                    email === "" ||
                    phone === "" ||
                    position_id === "" ||
                    photo === ""
                  }
                >
                  {navLinks[1].title}
                </Button>
              </div>
            </form>
            {error ? (
              <Alert sx={{ mt: "50px" }} severity="info">
                {error}
              </Alert>
            ) : (
              submitted
            )}
          </div>
        )}
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

  .success {
    display: flex;
    flex-direction: column;
    img {
      margin: 50px auto;
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
`;
export default SignUp;
