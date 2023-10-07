import App from "./App";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "./store";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <PersistGate loading={<CircularProgress />} persistor={persistor}> */}
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
};

export default Root;
