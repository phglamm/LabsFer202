import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

export default function PaginationOutlined({ count, page, onChange }) {
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

  const navigate = useNavigate();
  const handleChange = (event, value) => {
    navigate(`/home/page${value}`);
    onChange(event, value);
  };
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        color="rosy"
      />
    </ThemeProvider>
  );
}
