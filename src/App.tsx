import { Alarm, AlarmConfig, Timelet } from "./components/alarm";
import { Main } from "./components/main";
import { Footer } from "./components/footer";
import { Drawer } from "./components/drawer";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  const alarmConfig: AlarmConfig = {};

  const timetable: Timelet[] = [
    { id: "1", time: new Date("2023-10-04T13:31:00"), numOfRings: 4 },
    { id: "7", time: new Date("2023-10-04T08:38:50"), numOfRings: 4 },
    { id: "2", time: new Date("2023-09-30T01:34:00"), numOfRings: 3 },
    { id: "3", time: new Date("2023-10-03T16:28:30"), numOfRings: 3 },
    { id: "4", time: new Date("2023-10-23T16:36:00"), numOfRings: 3 },
    { id: "5", time: new Date("2023-10-01T14:30:00"), numOfRings: 3 },
    { id: "6", time: new Date("2023-10-02T12:36:00"), numOfRings: 3 },
  ];

  // return <Alarm timetable={timetable} config={alarmConfig} />;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
      <Footer />
      <Drawer />
    </ThemeProvider>
  );
}

export default App;
