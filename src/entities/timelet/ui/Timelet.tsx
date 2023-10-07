import {
  Typography,
  ListItem,
  ListItemButton,
  Switch,
  Stack,
  FormLabel,
} from "@mui/material";
import { pallete } from "@/theme";

import { Timelet, TimeletId } from "../types";
import { dateFormat } from "../config";
import { useAppDispatch } from "@/hooks/store";
import React from "react";
import { toggleAlarm } from "@/slices/alarms";

export const AlarmListItem = ({ timelet }: { timelet: Timelet }) => {
  const dispatch = useAppDispatch();

  const handleSwitchToggle =
    (id: TimeletId) => (_e: React.ChangeEvent, checked: boolean) => {
      dispatch(toggleAlarm({ id, disabled: !checked }));
    };

  const ringStr =
    timelet.numOfRings > 1 ? `ring ${timelet.numOfRings} times` : `ring once`;

  return (
    <ListItem key={timelet.id} disablePadding sx={{ alignItems: "stretch" }}>
      <ListItemButton>
        <Stack>
          <Typography color={pallete.grey400}>
            {timelet.start.toLocaleDateString("en-US", dateFormat)}
          </Typography>
          <Typography fontSize="1.4rem" fontWeight={100}>
            {String(timelet.start.getHours()).padStart(2, "0")}:
            {String(timelet.start.getMinutes()).padStart(2, "0")}
          </Typography>
          <Typography color={pallete.grey400} fontWeight={100}>
            {ringStr}
          </Typography>
        </Stack>
      </ListItemButton>
      <FormLabel sx={{ pr: 3, display: "flex", alignItems: "center" }}>
        <Switch
          edge="end"
          checked={!timelet.disabled}
          onChange={handleSwitchToggle(timelet.id)}
        />
      </FormLabel>
    </ListItem>
  );
};
