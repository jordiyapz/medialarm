import { createTheme } from "@mui/material";

export const pallete = {
  bgMain: "#242B31",
  bgDrawer: "#28363E",
  grey300: "#384349",
  grey400: "#768086",
  secondary: "#CB8CFF",
  primary: "#FF9345",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: pallete.primary,
    },
    secondary: {
      main: pallete.secondary,
    },
    text: {
      disabled: pallete.grey300,
    },
    background: {
      default: pallete.bgMain,
      // paper: pallete.bgPaper,
    },
  },
  mixins: {
    toolbar: {
      height: "116px",
      position: "absolute",
      top: "auto",
      bottom: 0,
    },
  },
});

export { theme };
