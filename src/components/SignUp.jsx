import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { navLinks, inputField } from "../constants";
import { fetchData } from "../fetchData/fetchData";
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
  const [positions, setPositions] = useState([]);
  const [position_id, setPosition_id] = useState("");
  const [photo, setPhoto] = useState("");
  const [token, setToken] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Getting position
  useEffect(() => {
    const fetchPositionData = async () => {
      const positionData = await fetchData(
        "https://frontend-test-assignment-api.abz.agency/api/v1/positions",
        { method: "GET" }
      );
      setPositions(positionData.positions);
    };
    fetchPositionData();
  }, []);

  // Getting token
  useEffect(() => {
    const fetchTokensData = async () => {
      const tokenData = await fetchData(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token ",
        { method: "GET" }
      );
      setToken(tokenData.token);
    };
    fetchTokensData();
  }, []);

  // Handling values change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value.toLowerCase());
    setSubmitted(false);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value.replace(/\s/g, "", "-"));
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

      const formData = new FormData();
      for (const name in user) {
        formData.append(name, user[name]);
      }
      fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
        method: "POST",
        headers: {
          Token: token,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const fetchTokensData = async () => {
              const tokenData = await fetchData(
                "https://frontend-test-assignment-api.abz.agency/api/v1/token ",
                { method: "GET" }
              );
              setToken(tokenData.token);
            };
            fetchTokensData();

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
      <Wrapper id="signUp">
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
