import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";

import { useProfileForm } from "../hooks";

const AddProfileButton = () => {
  const profileForm = useProfileForm();
  return (
    <Tooltip title={`${profileForm.isOpen ? "Cancel" : "Add alarm profile"}`}>
      <IconButton onClick={profileForm.toggle}>
        {profileForm.isOpen ? <CloseIcon /> : <AlarmAddIcon color="primary" />}
      </IconButton>
    </Tooltip>
  );
};

export default AddProfileButton;
