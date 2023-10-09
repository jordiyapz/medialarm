import App from "./App";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "./store";
import { ConfirmProvider } from "material-ui-confirm";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <PersistGate loading={<CircularProgress />} persistor={persistor}> */}
      <Provider store={store}>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default Root;
