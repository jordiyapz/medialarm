import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Typography, Stack, Button } from "@mui/material";
import { setShowExpired } from "../alarm-slice";

const AlarmProfileHeading = () => {
  const alarm = useAppSelector((s) => s.alarm);
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
