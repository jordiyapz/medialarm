import {
  Typography,
  ListItem,
  Switch,
  ListItemSecondaryAction,
  ListItemText,
  useTheme,
} from "@mui/material";
import { pallete } from "@/theme";

import { AlarmProfile, AlarmProfileId } from "../types";
import { dateFormat } from "../config";
import { useAppDispatch } from "@/shared/hooks/store";
import React from "react";
import { toggleAlarmProfile } from "@/entities/alarm/alarm-slice";
import { isExpired } from "..";

type AlarmTimeListProps = AlarmProfile;

export const AlarmListItem = (profile: AlarmTimeListProps) => {
  const theme = useTheme();
  const disabledColor = theme.palette.text.disabled;
  const defaultColor = theme.palette.text.primary;

  const dispatch = useAppDispatch();
  const handleSwitchToggle =
    (id: AlarmProfileId) => (_e: React.ChangeEvent, checked: boolean) => {
      dispatch(toggleAlarmProfile({ id, disabled: !checked }));
    };

  const ringText =
    profile.numOfRings > 1 ? `ring ${profile.numOfRings} times` : `ring once`;

  const expired = isExpired(profile);

  return (
    <ListItem dense sx={{ alignItems: "stretch" }}>
      <ListItemText>
        <Typography
          aria-disabled={expired}
          color={expired ? disabledColor : pallete.grey400}
        >
          {profile.start.toLocaleDateString("en-US", dateFormat)}
        </Typography>
        <Typography
          fontSize="1.4rem"
          fontWeight={100}
          aria-disabled={expired}
          color={expired ? disabledColor : defaultColor}
        >
          {String(profile.start.getHours()).padStart(2, "0")}:
          {String(profile.start.getMinutes()).padStart(2, "0")}
        </Typography>
        <Typography
          fontWeight={100}
          aria-disabled={expired}
          color={expired ? disabledColor : pallete.grey400}
        >
          {ringText}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        {!expired && (
          <Switch
            edge="end"
            checked={!profile.disabled}
            onChange={handleSwitchToggle(profile.id)}
          />
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
