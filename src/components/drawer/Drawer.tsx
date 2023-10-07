import { useEffect } from "react";
import {
  Drawer,
  type DrawerProps,
  Typography,
  IconButton,
  List,
  Box,
  Divider,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { pallete } from "@/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { addAlarm, removeAllAlarms } from "@/slices/alarms";
import { AlarmListItem, toTimelet } from "@/entities/timelet";
import { DrawerHeader } from ".";

export type AlarmDrawerProps = Pick<DrawerProps, "open"> & {
  onClose(): void;
  drawerWidth: number;
};

const alarmTimelets = [
  {
    numOfRings: 3,
    start: "2023-10-07T08:00:00",
  },
  {
    start: "2023-10-07T11:10:00",
  },
  {
    numOfRings: 3,
    start: "2023-10-05T14:10:00",
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

export const AlarmDrawer = ({
  drawerWidth,
  onClose,
  ...drawerProps
}: AlarmDrawerProps) => {
  const alarms = useAppSelector((s) => s.alarms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addAlarm(alarmTimelets));
    return () => {
      dispatch(removeAllAlarms());
    };
  }, [dispatch]);

  console.debug(alarms);

  return (
    <Drawer
      {...drawerProps}
      hideBackdrop
      onClose={(_, reason) => reason === "backdropClick" && onClose()}
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          background: pallete.bgDrawer,
          width: drawerWidth,
        },
      }}
    >
      <Box mx={2} mt={3}>
        <Typography variant="h1" fontWeight={700} fontSize="1.2rem">
          Alarm List
        </Typography>
      </Box>
      <List>
        {alarms.timelets.map(toTimelet).map((t) => (
          <AlarmListItem timelet={t} />
        ))}
      </List>
      <DrawerHeader>
        <Divider />
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
    </Drawer>
  );
};
