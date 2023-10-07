import { Box } from "@mui/material";

import { Main } from "@/components/main";
import { Footer } from "@/components/footer";
import { Drawer } from "@/components/drawer";
import { useOpenable } from "@/shared/lib";

import { DRAWER_WIDTH } from "./config";
import { useAppDispatch } from "./hooks/store";
import { useEffect } from "react";
import {
  addAlarmProfiles,
  removeAllAlarmProfiles,
} from "./entities/alarm/alarm-slice";
import { serializeAlarmProfile } from "./entities/alarm";

const initialAlarmProfiles = [
  {
    numOfRings: 3,
    start: "2023-10-07T08:00:00",
  },
  {
    start: "2023-10-08T11:10:00",
  },
  {
    numOfRings: 3,
    start: "2023-10-15T14:10:00",
  },
  {
    numOfRings: 4,
    start: "2023-10-07T10:10:00",
  },
].map((data, i) => ({
  id: String(i),
  disabled: false,
  numOfRings: data.numOfRings ?? 1,
  start: new Date(data.start),
}));

function App() {
  const drawer = useOpenable(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addAlarmProfiles(initialAlarmProfiles.map(serializeAlarmProfile)));
    return () => {
      dispatch(removeAllAlarmProfiles());
    };
  }, [dispatch]);

  return (
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
  );
}

export default App;
