import { Typography, Stack } from "@mui/material";

import { useAppSelector } from "@/shared/hooks/store";
import MoreMenu from "@/shared/ui/MoreMenu";

import { useProfileForm } from "../hooks";
import { selectAlarm } from "../alarm-slice";

import AddProfileButton from "./AddProfileButton";
import { ToggleExpiredButton } from "./ToggleExpiredButton";
import { DeleteExpiredButton } from "./DeleteExpiredButton";
import ExportMenuItem from "./ExportMenuItem";
import ImportMenuItem from "./ImportMenuItem";

const AlarmProfileHeading = () => {
  const { isEditing } = useProfileForm();
  const { showExpired } = useAppSelector(selectAlarm);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mx: 2, mt: 3 }}
    >
      <Typography variant="h1" fontWeight={700} fontSize="1.2rem">
        Alarm Profiles
      </Typography>
      <Stack direction="row">
        {!isEditing && <AddProfileButton />}
        {showExpired && <DeleteExpiredButton />}
        <ToggleExpiredButton />
        <MoreMenu>
          <ImportMenuItem />
          <ExportMenuItem />
        </MoreMenu>
      </Stack>
    </Stack>
  );
};

export default AlarmProfileHeading;
