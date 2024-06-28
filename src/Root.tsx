import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { theme } from "./theme";
import { persistor, store } from "./store";
import AlarmAudioPlayerProvider from "./shared/ui/AlarmAudioProvider";

import "dayjs/locale/id";
import dayjs from "dayjs";
dayjs.locale("id");

const Root = () => {
  return (
    <FlagsmithProvider
      options={{ environmentID: "LbVztCCJ2kghQCx39JE5Lj" }}
      flagsmith={flagsmith}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <PersistGate loading={<CircularProgress />} persistor={persistor}>
              <ConfirmProvider>
                <AlarmAudioPlayerProvider>
                  <App />
                  <ToastContainer position="top-left" theme="dark" />
                </AlarmAudioPlayerProvider>
              </ConfirmProvider>
            </PersistGate>
          </LocalizationProvider>
        </Provider>
      </ThemeProvider>
    </FlagsmithProvider>
  );
};

export default Root;
