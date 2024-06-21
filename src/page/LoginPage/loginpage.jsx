import React, { useEffect } from "react";
import {
  Button,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import "../../scss/loginpage.scss";

export default function Login() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/home");
    }
  }, [user, navigate]);

  const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
        rosy: {
          main: "#b48484",
        },
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              "--TextField-brandBorderColor": "#b48484",
              "--TextField-brandBorderHoverColor": "#b48484",
              "--TextField-brandBorderFocusedColor": "#b48484",
              "& label.Mui-focused": {
                color: "var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: "var(--TextField-brandBorderColor)",
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "var(--TextField-brandBorderHoverColor)",
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              "&::before, &::after": {
                borderBottom: "2px solid var(--TextField-brandBorderColor)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused:after": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              "&::before": {
                borderBottom: "2px solid var(--TextField-brandBorderColor)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused:after": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
      },
    });

  const outerTheme = useTheme();

  return (
    <div className="login-content">
      <div className="falling-flower" style={{ left: "10%" }}></div>
      <div className="falling-flower" style={{ left: "20%" }}></div>

      <div
        className="falling-flower"
        style={{ left: "30%", animationDelay: "1s" }}
      ></div>
      <div
        className="falling-flower"
        style={{ left: "40%", animationDelay: "1s" }}
      ></div>
      <div
        className="falling-flower"
        style={{ left: "50%", animationDelay: "2s" }}
      ></div>
      <div
        className="falling-flower"
        style={{ left: "60%", animationDelay: "2s" }}
      ></div>
      <div
        className="falling-flower"
        style={{ left: "70%", animationDelay: "3s" }}
      ></div>
      <div
        className="falling-flower"
        style={{ left: "80%", animationDelay: "3s" }}
      ></div>
      <div
        className="falling-flower"
        style={{ left: "90%", animationDelay: "4s" }}
      ></div>
      <div
        className="falling-flower"
        style={{ left: "100%", animationDelay: "4s" }}
      ></div>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Button
          onClick={handleGoogleSignIn}
          className="roboto-regular detail-button"
          color="rosy"
          variant="contained"
        >
          Login With Google
        </Button>
      </ThemeProvider>
    </div>
  );
}
