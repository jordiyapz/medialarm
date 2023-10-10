import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";
import { Button } from "@mui/material";
import { selectAlarm, setShowExpired } from "../alarm-slice";

export function ToggleExpiredButton() {
  const alarm = useAppSelector(selectAlarm);
  const dispatch = useAppDispatch();
  const handleToggleShowExpired = () => {
    dispatch(setShowExpired(!alarm.showExpired));
  };

  return (
    <Button
      variant="outlined"
      size="small"
      color="secondary"
      onClick={handleToggleShowExpired}
    >
      {alarm.showExpired ? "Hide" : "Show"} Expired
    </Button>
  );
}
