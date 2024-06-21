import { Col, Container, Row } from "react-bootstrap";
import "../../scss/PreCom.scss";
import ImgMediaCard from "../Card/Card";
import PaginationOutlined from "../PaginationCom/PaginationCom";
import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
} from "@mui/material";
// import { OrchidsData } from "../../shared/ListOfOrchids";
import axios from "axios";
import { useTheme } from "@emotion/react";

export default function PreCom() {
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
  // const [products, setProducts] = useState(OrchidsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const [orchidAPI, setOrchidAPI] = useState([]);

  // const fetchOrchid = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://6670efe70900b5f8724bfbea.mockapi.io/OrchidData"
  //     );
  //     console.log(response);
  //     setOrchidAPI(response.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        const response = await axios.get(
          "https://6670efe70900b5f8724bfbea.mockapi.io/OrchidData"
        );
        console.log(response);
        setOrchidAPI(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchOrchid();
  }, []); // Or [] if effect doesn't need props or state

  // const [totalPages, setTotalPages] = useState(0);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const filteredProducts = orchidAPI
    .filter((orchid) =>
      orchid.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

  const paginatedData = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="PreCom">
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Container>
          <div className="search-sort">
            <TextField
              label="Search by name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginTop: "20px" }}
            />
            <Button
              className="roboto-regular detail-button"
              color="rosy"
              variant="contained"
              onClick={handleSort}
              style={{ marginTop: "20px" }}
            >
              Sort
              {sortOrder === "asc"}
            </Button>
          </div>
          <Row>
            {paginatedData.map((orchid) => (
              <Col key={orchid.id} md={6} className="card-col">
                <ImgMediaCard
                  id={orchid.id}
                  image={orchid.image}
                  name={orchid.name}
                  origin={orchid.origin}
                  rating={orchid.rating}
                  isSpecial={orchid.isSpecial}
                  color={orchid.color}
                  category={orchid.category}
                />
              </Col>
            ))}
          </Row>
        </Container>
        <div className="pagination">
          <PaginationOutlined
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          ></PaginationOutlined>
        </div>
      </ThemeProvider>
    </div>
  );
}
