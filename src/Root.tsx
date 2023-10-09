import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";

import App from "./App";
import { theme } from "./theme";
import { store } from "./store";
import AlarmAudioPlayerProvider from "./shared/ui/AlarmAudioProvider";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <PersistGate loading={<CircularProgress />} persistor={persistor}> */}
      <Provider store={store}>
        <ConfirmProvider>
          <AlarmAudioPlayerProvider>
            <App />
          </AlarmAudioPlayerProvider>
        </ConfirmProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default Root;
