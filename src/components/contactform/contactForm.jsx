import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/features/contact/contactSlice";

import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
  phone: Yup.string().required("Phone is required"),
  agree: Yup.boolean().oneOf(
    [true],
    "The terms and conditions must be accepted."
  ),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toast.success("Your Information has been saved");
      //   alert(JSON.stringify(formik.values));
      dispatch(addContact(values));
      resetForm();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="phone"
        name="phone"
        label="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <TextField
        fullWidth
        id="message"
        name="message"
        label="Message"
        value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        multiline
        rows={4}
      />

      <FormControlLabel
        control={<Switch />}
        label="Agree to terms and conditions."
        name="agree"
        value={formik.values.agree}
        onClick={formik.handleChange}
      />
      {formik.errors.agree && (
        <Typography variant="caption" color="red">
          {formik.errors.agree}
        </Typography>
      )}

      <Button
        className="roboto-regular detail-button"
        color="rosy"
        variant="contained"
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
};

export default ContactForm;
