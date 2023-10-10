import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";
import { IconButton, Tooltip } from "@mui/material";
import { selectAlarm, setShowExpired } from "../alarm-slice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export function ToggleExpiredButton() {
  const { showExpired } = useAppSelector(selectAlarm);
  const dispatch = useAppDispatch();
  const handleToggleShowExpired = () => {
    dispatch(setShowExpired(!showExpired));
  };

  return (
    <Tooltip title={`${showExpired ? "Hide" : "Show"} expired profiles`}>
      <IconButton color="secondary" onClick={handleToggleShowExpired}>
        {showExpired ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </Tooltip>
  );
}
