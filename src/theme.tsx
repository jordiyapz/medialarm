import { createTheme } from "@mui/material";

export const pallete = {
  bgMain: "#242B31",
  bgDrawer: "#28363E",
  grey300: "#384349",
  grey400: "#768086",
  off: "#8D24DE",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: pallete.off,
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
