import { useEffect } from "react";
import { Box } from "@mui/material";
import { Main } from "@/components/main";
import { Footer } from "@/components/footer";
import { Drawer } from "@/components/drawer";
import { useOpenable } from "@/shared/lib";

import { DRAWER_WIDTH } from "./config";
import { useAppDispatch } from "./hooks/store";
import {
  addAlarmProfiles,
  removeAllAlarmProfiles,
} from "./entities/alarm/alarm-slice";
import { createProfile } from "./entities/alarm";
import { useAlarmAudio } from "./hooks/audio-player";
import { AlarmAudioContext } from "./AlarmAudioContex";
import ringtone from "/singing-bowl.mp3";

const initialAlarmProfiles = [
  {
    numOfRings: 3,
    start: new Date("2023-10-07T08:00:00"),
  },
  {
    numOfRings: 3,
    start: new Date("2023-10-15T14:10:00"),
  },
  {
    start: new Date("2023-10-08T11:10:00"),
  },
  {
    start: new Date("2023-10-09T08:53:00"),
    numOfRings: 3,
  },
  {
    numOfRings: 4,
    start: new Date("2023-10-07T10:10:00"),
  },
].map(createProfile);

function App() {
  const drawer = useOpenable(false);
  const dispatch = useAppDispatch();

  const player = useAlarmAudio(ringtone);

  useEffect(() => {
    dispatch(addAlarmProfiles(initialAlarmProfiles));
    return () => {
      dispatch(removeAllAlarmProfiles());
    };
  }, [dispatch]);

  return (
    <AlarmAudioContext.Provider value={player}>
      <Box sx={{ display: "flex" }}>
        <Main drawerWidth={DRAWER_WIDTH} drawerOpen={drawer.open} />
        <Footer
          open={drawer.open}
          drawerWidth={DRAWER_WIDTH}
          onMenuClick={drawer.toggle}
        />
        <Drawer
          open={drawer.open}
          onClose={drawer.toggle}
          drawerWidth={DRAWER_WIDTH}
        />
      </Box>
    </AlarmAudioContext.Provider>
  );
}

export default App;
