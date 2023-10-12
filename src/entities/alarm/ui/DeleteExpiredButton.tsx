import { Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { WarnIconButton } from "@/shared/ui/WarnIconButton";

import {
  deleteAlarmProfile,
  selectAlarmProfiles,
  setShowExpired,
  setShowForm,
} from "../alarm-slice";
import { isExpired, rehydrateAlarmProfile } from "..";

export function DeleteExpiredButton() {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectAlarmProfiles);
  const expiredProfiles = profiles
    .map(rehydrateAlarmProfile)
    .filter((p) => isExpired(p));
  const handleDeletes = () => {
    expiredProfiles.forEach((profile) => {
      dispatch(deleteAlarmProfile(profile.id));
    });
    dispatch(setShowForm(false));
    dispatch(setShowExpired(false));
  };

  return (
    <Tooltip title="Delete expired alarm profiles">
      <div>
        <WarnIconButton
          color="secondary"
          onClick={handleDeletes}
          disabled={!expiredProfiles.length}
        >
          <AutoDeleteIcon />
        </WarnIconButton>
      </div>
    </Tooltip>
  );
}
