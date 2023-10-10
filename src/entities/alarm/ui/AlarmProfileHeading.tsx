import { Typography, Stack } from "@mui/material";

import AddProfileButton from "./AddProfileButton";
import { ToggleExpiredButton } from "./ToggleExpiredButton";
import { useProfileForm } from "../hooks";

const AlarmProfileHeading = () => {
  const { isEditing } = useProfileForm();
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
        <ToggleExpiredButton />
        {!isEditing && <AddProfileButton />}
      </Stack>
    </Stack>
  );
};

export default AlarmProfileHeading;
