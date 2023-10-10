import React from "react";
import {
  Typography,
  ListItem,
  Switch,
  ListItemSecondaryAction,
  ListItemText,
  useTheme,
  Stack,
  ListItemButton,
} from "@mui/material";
import { pallete } from "@/theme";
import { useAppDispatch } from "@/shared/hooks/store";
import { setAlarmDisabled } from "@/entities/alarm/alarm-slice";

import { AlarmProfile, AlarmProfileId } from "../types";
import { dateFormat } from "../config";
import { isExpired } from "..";
import { useProfileForm } from "../hooks";

type AlarmTimeListProps = AlarmProfile;

export const AlarmListItem = (profile: AlarmTimeListProps) => {
  const theme = useTheme();
  const disabledColor = theme.palette.text.disabled;
  const defaultColor = theme.palette.text.primary;
  const profileForm = useProfileForm();
  const dispatch = useAppDispatch();
  const handleSwitchToggle =
    (id: AlarmProfileId) => (_e: React.ChangeEvent, checked: boolean) => {
      dispatch(setAlarmDisabled({ id, disabled: !checked }));
    };

  const ringText =
    profile.numOfRings > 1 ? `ring ${profile.numOfRings} times` : `ring once`;

  const expired = isExpired(profile);
  const handleClick = () => {
    profileForm.edit(profile.id);
  };

  return (
    <ListItem
      disablePadding
      dense
      sx={{ alignItems: "stretch" }}
      secondaryAction={
        !expired && (
          <Switch
            edge="end"
            checked={!profile.disabled}
            onChange={handleSwitchToggle(profile.id)}
          />
        )
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText disableTypography>
          <Typography
            aria-disabled={expired}
            color={expired ? disabledColor : pallete.grey400}
          >
            {profile.start.toLocaleDateString("en-US", dateFormat)}
          </Typography>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography
              fontSize="1.4rem"
              fontWeight={100}
              aria-disabled={expired}
              color={expired ? disabledColor : defaultColor}
            >
              {String(profile.start.getHours()).padStart(2, "0")}:
              {String(profile.start.getMinutes()).padStart(2, "0")}
            </Typography>
            <Typography color={pallete.grey400}>{profile.name}</Typography>
          </Stack>
          <Typography
            fontWeight={100}
            aria-disabled={expired}
            color={expired ? disabledColor : pallete.grey400}
          >
            {ringText}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
