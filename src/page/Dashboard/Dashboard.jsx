import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import "../../scss/Dashboard.scss";
import ResponsiveAppBar from "../../components/Navbar/AppBar";
import { Container } from "react-bootstrap";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  outlinedInputClasses,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Image } from "antd";

export default function Dashboard() {
  const [orchidAPI, setOrchidAPI] = useState([]);
  const [newOrchid, setNewOrchid] = useState({
    name: "",
    origin: "",
    color: "",
    isSpecial: false,
    rating: "",
    category: "",
    image: "",
  });

  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenModalEdit = (value) => {
    console.log(value.id);
    setSelectedOrchid(value);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => setOpenModalEdit(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (openModalEdit) {
      setSelectedOrchid({ ...selectedOrchid, [name]: value });
      console.log(selectedOrchid);
    } else {
      setNewOrchid({ ...newOrchid, [name]: value });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Orchid's Name", width: 250 },
    {
      field: "origin",
      headerName: "Orchid's Origin",
      width: 200,
    },
    {
      field: "color",
      headerName: "Orchid's Color",
      width: 250,
    },
    {
      field: "isSpecial",
      headerName: "Orchid's Speciality",
      width: 150,
    },
    {
      field: "rating",
      headerName: "Orchid's Rating",
      type: "number",
      width: 150,
    },
    {
      field: "category",
      headerName: "Orchid's Category",
      width: 150,
    },
    {
      field: "image",
      headerName: "Image",
      width: 250,
      height: 300,
      renderCell: (params) => (
        <>
          <Image
            src={params.value}
            alt="orchid"
            style={{ width: "300px", height: "auto" }}
          />
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="button-action">
          <Button
            className="roboto-regular detail-button"
            color="rosy"
            variant="contained"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <Button
            className="roboto-regular detail-button"
            color="rosy"
            variant="contained"
            onClick={() => handleOpenModalEdit(params.row)}
          >
            Edit
          </Button>
          <Modal
            className="modal-form"
            open={openModalEdit}
            onClose={handleCloseModalEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" className="title">
                Edit Orchid
              </Typography>
              <form onSubmit={handleEdit} className="form-crud">
                <TextField
                  name="name"
                  className="form-input"
                  label="Orchid's Name"
                  onChange={handleInputChange}
                  value={selectedOrchid?.name}
                />
                <TextField
                  name="origin"
                  className="form-input"
                  label="Orchid's Origin"
                  onChange={handleInputChange}
                  value={selectedOrchid?.origin}
                />
                <TextField
                  name="color"
                  className="form-input"
                  label="Orchid's Color"
                  onChange={handleInputChange}
                  value={selectedOrchid?.color}
                />
                <TextField
                  name="rating"
                  className="form-input"
                  label="Orchid's Rating"
                  onChange={handleInputChange}
                  value={selectedOrchid?.rating}
                />
                <TextField
                  name="category"
                  className="form-input"
                  label="Orchid's Category"
                  onChange={handleInputChange}
                  value={selectedOrchid?.category}
                />
                <TextField
                  name="image"
                  className="form-input"
                  label="Orchid's Image"
                  onChange={handleInputChange}
                  value={selectedOrchid?.image}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isSpecial"
                      checked={selectedOrchid?.isSpecial}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "isSpecial",
                            value: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                  labelPlacement="start"
                  label="Orchid's Specialty"
                  className="form-input-checkbox"
                />
                <Button
                  className="roboto-regular detail-button crud-button"
                  color="rosy"
                  variant="contained"
                  type="submit"
                >
                  Edit Orchid
                </Button>{" "}
              </form>
            </Box>
          </Modal>
        </div>
      ),
    },
  ];

  const fetchOrchid = async () => {
    try {
      const response = await axios.get(
        "https://6670efe70900b5f8724bfbea.mockapi.io/OrchidData"
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://6670efe70900b5f8724bfbea.mockapi.io/OrchidData",
        newOrchid
      );
      setNewOrchid({
        name: "",
        origin: "",
        color: "",
        isSpecial: true,
        rating: "",
        category: "",
        image: "",
      });
      setOpenModal(false);
      toast.success("Add Orchid Successfully");
      fetchOrchid();
    } catch (error) {
      toast.error("Add Orchid has failed, There is Error");
      console.log(error.response.data);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedOrchid);
      const response = await axios.put(
        `https://6670efe70900b5f8724bfbea.mockapi.io/OrchidData/${selectedOrchid.id}`,
        selectedOrchid
      );
      const updatedOrchid = orchidAPI.map((orchid) =>
        orchid.id === selectedOrchid.id ? response.data : orchid
      );

      toast.success("Orchid Edited successfully");
      setOrchidAPI(updatedOrchid);
      setSelectedOrchid(null);
      setOpenModalEdit(false);
      // fetchOrchid();
    } catch (error) {
      toast.error("Failed to edit orchid");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://6670efe70900b5f8724bfbea.mockapi.io/OrchidData/${id}`
      );
      toast.success("Orchid deleted successfully");
      fetchOrchid();
    } catch (error) {
      toast.error("Failed to delete orchid");
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <ThemeProvider theme={customTheme(outerTheme)}>
          <div className="content">
            <ResponsiveAppBar></ResponsiveAppBar>

            <Container className="detail-all">
              <Button
                onClick={handleOpenModal}
                className="roboto-regular detail-button crud-button"
                color="rosy"
                variant="contained"
              >
                Add New Orchid
              </Button>
              <Modal
                className="modal-form"
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Box sx={style}>
                  <Typography id="transition-modal-title" className="title">
                    Create new Orchid
                  </Typography>
                  <form onSubmit={handleSubmit} className="form-crud">
                    <TextField
                      name="name"
                      className="form-input"
                      label="Orchid's Name"
                      onChange={handleInputChange}
                      value={newOrchid.name}
                    />
                    <TextField
                      name="origin"
                      className="form-input"
                      label="Orchid's Origin"
                      onChange={handleInputChange}
                      value={newOrchid.origin}
                    />
                    <TextField
                      name="color"
                      className="form-input"
                      label="Orchid's Color"
                      onChange={handleInputChange}
                      value={newOrchid.color}
                    />
                    <TextField
                      name="rating"
                      className="form-input"
                      label="Orchid's Rating"
                      onChange={handleInputChange}
                      value={newOrchid.rating}
                    />
                    <TextField
                      name="category"
                      className="form-input"
                      label="Orchid's Category"
                      onChange={handleInputChange}
                      value={newOrchid.category}
                    />
                    <TextField
                      name="image"
                      className="form-input"
                      label="Orchid's Image"
                      onChange={handleInputChange}
                      value={newOrchid.image}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isSpecial"
                          checked={newOrchid.isSpecial}
                          onChange={(e) =>
                            handleInputChange({
                              target: {
                                name: "isSpecial",
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                      }
                      labelPlacement="start"
                      label="Orchid's Specialty"
                      className="form-input-checkbox"
                    />
                    <Button
                      className="roboto-regular detail-button crud-button"
                      color="rosy"
                      variant="contained"
                      type="submit"
                    >
                      Add Orchid
                    </Button>{" "}
                  </form>
                </Box>
              </Modal>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={orchidAPI}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </div>{" "}
            </Container>

            <Footer></Footer>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
