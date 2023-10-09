import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addSecond } from "@/shared/lib";
import { useAppDispatch } from "@/shared/hooks/store";

import { addAlarmProfiles } from "../alarm-slice";
import { createProfile } from "..";

const sec = 3;

const AddProfileButton = () => {
  const dispatch = useAppDispatch();
  const handleAddProfile = () => {
    dispatch(
      addAlarmProfiles([createProfile({ start: addSecond(new Date(), sec) })])
    );
  };
  return (
    <Tooltip title={`Add ${sec} seconds alarm profile`}>
      <IconButton onClick={handleAddProfile}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AddProfileButton;
