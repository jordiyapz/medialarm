import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";

import App from "./App";
import { theme } from "./theme";
import { persistor, store } from "./store";
import AlarmAudioPlayerProvider from "./shared/ui/AlarmAudioProvider";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
          <ConfirmProvider>
            <AlarmAudioPlayerProvider>
              <App />
            </AlarmAudioPlayerProvider>
          </ConfirmProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default Root;
