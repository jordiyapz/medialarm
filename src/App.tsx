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
import { useConfirm } from "material-ui-confirm";

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
  // const confirmation = useOpenable(true);
  const player = useAlarmAudio(ringtone);

  const confirm = useConfirm();

  useEffect(() => {
    dispatch(addAlarmProfiles(initialAlarmProfiles));
    return () => {
      dispatch(removeAllAlarmProfiles());
    };
  }, [dispatch]);

  useEffect(() => {
    confirm({
      title: "Allow this app to play audio?",
      description:
        "In order that this application can play the alarm sound you must permit it to play audio.",
      dialogProps: { maxWidth: "md" },
      confirmationText: "Yes, I Allow",
      cancellationText: "I just want to hang around",
      allowClose: false,
    })
      .then(() => {
        player.loadAudio();
      })
      .catch(() => {
        confirm({
          title: "Understandable.",
          description:
            "Please enable audio playback anytime from the button below to the left. Have a good day!",
          dialogProps: { maxWidth: "xs" },
          hideCancelButton: true,
        });
      });
  }, []);

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
