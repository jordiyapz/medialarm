import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";
import { Typography, Stack, Button } from "@mui/material";

import { selectAlarm, setShowExpired } from "../alarm-slice";
import AddProfileButton from "./AddProfileButton";

const AlarmProfileHeading = () => {
  const alarm = useAppSelector(selectAlarm);
  const dispatch = useAppDispatch();
  const handleToggleShowExpired = () => {
    dispatch(setShowExpired(!alarm.showExpired));
  };

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
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        onClick={handleToggleShowExpired}
      >
        {alarm.showExpired ? "Hide" : "Show"} Expired
      </Button>
    </Stack>
  );
};

export default AlarmProfileHeading;
