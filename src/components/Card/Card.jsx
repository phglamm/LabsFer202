import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import "../../scss/Card.scss";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material";
export default function ImgMediaCard({
  id,
  image,
  name,
  origin,
  rating,
  color,
  isSpecial,
  category,
}) {
  const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
        rosy: {
          main: "#b48484",
        },
      },
    });

  const outerTheme = useTheme();

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Card className="card-mui roboto-regular" key={id} raised={true}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={image}
        />
        <CardContent>
          <StyledRating
            readOnly
            name="customized-color"
            defaultValue={rating}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />{" "}
          <h3>{name}</h3>
          <p>{origin}</p>
        </CardContent>
        <CardActions>
          <Link to={`/detail/${id}`} key={id}>
            <Button
              size="large"
              className="card-button roboto-regular"
              color="rosy"
            >
              View Detail
            </Button>
          </Link>
          <Button
            size="large"
            onClick={handleClickOpen}
            className="card-button roboto-regular"
            color="rosy"
          >
            View Popup
          </Button>
          <React.Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <h4 className="roboto-regular"> {name}</h4>
              </DialogTitle>
              <DialogContent className="roboto-regular">
                <DialogContent
                  id="alert-dialog-description"
                  className="dialog-img"
                >
                  <img src={image} alt="" />
                </DialogContent>
                <p id="alert-dialog-description">Origin: {origin}</p>
                <p id="alert-dialog-description">Color: {color}</p>

                {isSpecial ? (
                  <p id="alert-dialog-description">This is Special Orchid</p>
                ) : (
                  <p id="alert-dialog-description">Common Orchids</p>
                )}
                <p id="alert-dialog-description">Category: {category}</p>
                <StyledRating
                  readOnly
                  name="customized-color"
                  defaultValue={rating}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                  }
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  autoFocus
                  color="rosy"
                  className="card-button roboto-regular"
                >
                  View More
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>{" "}
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
