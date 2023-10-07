import {
  Typography,
  ListItem,
  ListItemButton,
  Switch,
  Stack,
  FormLabel,
} from "@mui/material";
import { pallete } from "@/theme";

import { AlarmProfile, AlarmProfileId } from "../types";
import { dateFormat } from "../config";
import { useAppDispatch } from "@/hooks/store";
import React from "react";
import { toggleAlarmProfile } from "@/entities/alarm/alarm-slice";

type AlarmTimeListProps = AlarmProfile;

export const AlarmListItem = (profile: AlarmTimeListProps) => {
  const dispatch = useAppDispatch();

  const handleSwitchToggle =
    (id: AlarmProfileId) => (_e: React.ChangeEvent, checked: boolean) => {
      dispatch(toggleAlarmProfile({ id, disabled: !checked }));
    };

  const ringStr =
    profile.numOfRings > 1 ? `ring ${profile.numOfRings} times` : `ring once`;

  return (
    <ListItem disablePadding sx={{ alignItems: "stretch" }}>
      <ListItemButton>
        <Stack>
          <Typography color={pallete.grey400}>
            {profile.start.toLocaleDateString("en-US", dateFormat)}
          </Typography>
          <Typography fontSize="1.4rem" fontWeight={100}>
            {String(profile.start.getHours()).padStart(2, "0")}:
            {String(profile.start.getMinutes()).padStart(2, "0")}
          </Typography>
          <Typography color={pallete.grey400} fontWeight={100}>
            {ringStr}
          </Typography>
        </Stack>
      </ListItemButton>
      <FormLabel sx={{ pr: 3, display: "flex", alignItems: "center" }}>
        <Switch
          edge="end"
          checked={!profile.disabled}
          onChange={handleSwitchToggle(profile.id)}
        />
      </FormLabel>
    </ListItem>
  );
};
