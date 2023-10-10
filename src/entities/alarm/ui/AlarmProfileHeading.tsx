import { Typography, Stack } from "@mui/material";

import AddProfileButton from "./AddProfileButton";
import { ToggleExpiredButton } from "./ToggleExpiredButton";

const AlarmProfileHeading = () => {
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
      <AddProfileButton />
      <ToggleExpiredButton />
    </Stack>
  );
};

export default AlarmProfileHeading;
