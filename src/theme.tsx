import { createTheme } from "@mui/material";

export const pallete = {
  bgMain: "#242B31",
  bgPaper: "#28363E",
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
      paper: pallete.bgPaper,
    },
  },
});

/** Custom palette */
// theme = createTheme(theme, {
//   palette: {
//     grey: theme.palette.augmentColor({
//       color: {
//         main: pallete.grey300,
//       },
//       name: "grey",
//     }),
//   },
// });

export { theme };
