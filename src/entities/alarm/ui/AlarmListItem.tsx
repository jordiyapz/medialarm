import React from "react";
import {
  ListItemButton,
  ListItemText,
  Typography,
  ListItem,
  Switch,
  useTheme,
  Stack,
  IconButton,
} from "@mui/material";
import { pallete } from "@/theme";
import { useAppDispatch } from "@/shared/hooks/store";
import {
  deleteAlarmProfile,
  setAlarmDisabled,
} from "@/entities/alarm/alarm-slice";
import DeleteIcon from "@mui/icons-material/Delete";

import { AlarmProfile, AlarmProfileId } from "../types";
import { dateFormat } from "../config";
import { isExpired } from "..";
import { useProfileForm } from "../hooks";

type AlarmTimeListProps = AlarmProfile;

// TODO: use from AlaramListItemBase

export const AlarmListItem = (profile: AlarmTimeListProps) => {
  const theme = useTheme();
  const disabledColor = theme.palette.text.disabled;
  const defaultColor = theme.palette.text.primary;

  const profileForm = useProfileForm();
  const dispatch = useAppDispatch();

  const ringText =
    profile.numOfRings > 1 ? `ring ${profile.numOfRings} times` : `ring once`;

  const expired = isExpired(profile);

  const handleSwitchToggle =
    (id: AlarmProfileId) => (_e: React.ChangeEvent, checked: boolean) => {
      dispatch(setAlarmDisabled({ id, disabled: !checked }));
    };
  const handleEdit = () => {
    profileForm.edit(profile.id);
  };
  const handleDelete = () => {
    dispatch(deleteAlarmProfile(profile.id));
  };

  return (
    <ListItem
      disablePadding
      dense
      sx={{ alignItems: "stretch" }}
      secondaryAction={
        expired ? (
          <IconButton color="secondary" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <Switch
            edge="end"
            checked={!profile.disabled}
            onChange={handleSwitchToggle(profile.id)}
          />
        )
      }
    >
      <ListItemButton onClick={handleEdit}>
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
