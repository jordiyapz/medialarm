import {
  ListItemText,
  Typography,
  ListItem,
  Stack,
  useTheme,
} from "@mui/material";
import { pallete } from "@/theme";

import { AlarmProfile } from "../types";
import { dateFormat } from "../config";
import { isExpired } from "..";

type AlarmTimeListProps = { profile: AlarmProfile; neverExpired?: boolean };

export const AlarmListItemBase = ({
  profile,
  neverExpired,
}: AlarmTimeListProps) => {
  const theme = useTheme();
  const disabledColor = theme.palette.text.disabled;
  const defaultColor = theme.palette.text.primary;

  const expired = !neverExpired && isExpired(profile);
  const ringText =
    profile.numOfRings > 1 ? `ring ${profile.numOfRings} times` : `ring once`;

  return (
    <ListItem disablePadding dense sx={{ alignItems: "stretch" }}>
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
    </ListItem>
  );
};
