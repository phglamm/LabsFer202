import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Col, Container, Row } from "react-bootstrap";
import {
  Button,
  Rating,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
  styled,
  useTheme,
} from "@mui/material";
import "../../scss/DetailPage.scss";
import ResponsiveAppBar from "../../components/Navbar/AppBar";
import { duongdan } from "../../router";
import axios from "axios";
import { useEffect, useState } from "react";
export default function DetailPage() {
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

  const { id } = useParams();
  const [orchidAPI, setOrchidAPI] = useState(null);
  const fetchOrchid = async () => {
    try {
      const response = await axios.get(
        `https://6670efe70900b5f8724bfbea.mockapi.io/OrchidData/${id}`
      );
      console.log(response);
      console.log(response.data);
      setOrchidAPI(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchOrchid();
  });

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  return (
    <div>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <div className="content">
          <ResponsiveAppBar></ResponsiveAppBar>

          <Container className="detail-all">
            {orchidAPI ? (
              <Row className="detail-row">
                <Col xs={12} md={6} className="detail-img">
                  <img src={orchidAPI.image} alt="" />
                </Col>
                <Col xs={12} md={6} className="detail-content">
                  <div className="detail-material">
                    <h3>{orchidAPI.name}</h3>
                    <h5>Origin: {orchidAPI.origin}</h5>
                    <p>Color: {orchidAPI.color}</p>
                    {orchidAPI.isSpecial ? (
                      <p>This is a Special Orchids</p>
                    ) : (
                      <p>Uncommon Orchids</p>
                    )}
                    <p>Category: {orchidAPI.category}</p>
                    <StyledRating
                      readOnly
                      name="customized-color"
                      defaultValue={orchidAPI.rating}
                      getLabelText={(value) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      precision={0.5}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                    <Link to={duongdan.home}>
                      <Button
                        className="roboto-regular detail-button"
                        color="rosy"
                        variant="contained"
                      >
                        Back To Home
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row className="detail-row">
                <Col xs={12} md={6} className="detail-content">
                  <h1>Loading...</h1>
                </Col>
              </Row>
            )}
          </Container>

          <Footer></Footer>
        </div>
      </ThemeProvider>
    </div>
  );
}
