import { Container } from "react-bootstrap";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import ResponsiveAppBar from "../../components/Navbar/AppBar";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import "../../scss/Contactpage.scss";

import { outlinedInputClasses, Typography } from "@mui/material";
import { Phone } from "@mui/icons-material";
import ContactForm from "../../components/contactform/contactForm";
export default function Contactpage() {
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
    <div>
      <div className="content">
        <ResponsiveAppBar></ResponsiveAppBar>
        <Container fluid>
          <Banner
            banner1={
              "https://static.vecteezy.com/system/resources/previews/036/040/519/large_2x/ai-generated-pink-peach-orchids-bouquet-on-light-background-with-glitter-and-bokeh-banner-with-copy-space-perfect-for-poster-greeting-card-event-invitation-promotion-print-elegant-design-photo.jpeg"
            }
            banner2={
              "https://homesteadgardens.com/wp-content/uploads/Orchid-Banner-e1677007591368.png"
            }
            banner3={
              "https://static.vecteezy.com/system/resources/previews/015/743/596/large_2x/delicate-background-with-purple-orchid-flowers-for-postcards-and-graphic-works-banner-panorama-with-space-for-text-photo.jpg"
            }
            banner4={
              "https://www.kaleialoha.com/wp-content/uploads/2020/04/pink-spotted-orchids-banner.jpg"
            }
          ></Banner>
        </Container>

        <Container>
          <div className="contact">
            <div className="contact-email">
              <EmailIcon className="icon" fontSize="large"></EmailIcon>
              <Typography className="roboto-regular">
                phonglqse183161@fpt.edu.vn
              </Typography>
            </div>
            <div className="contact-phone">
              <Phone className="icon" fontSize="large"></Phone>
              <Typography className="roboto-regular">+84 586998792</Typography>
            </div>
          </div>
          <Typography
            variant="h3"
            gutterBottom
            textAlign="center"
            marginTop="10%"
            fontWeight="800"
            className="roboto-regular"
          >
            Contact Us
          </Typography>
          <ThemeProvider theme={customTheme(outerTheme)}>
            <ContactForm />
          </ThemeProvider>
        </Container>

        <Footer></Footer>
      </div>
    </div>
  );
}
