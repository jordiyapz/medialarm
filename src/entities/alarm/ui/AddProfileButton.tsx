import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { useProfileForm } from "../hooks";

const AddProfileButton = () => {
  const profileForm = useProfileForm();
  return (
    <Tooltip title={`Add alarm profile`}>
      <IconButton onClick={profileForm.toggle}>
        {profileForm.isOpen ? <CloseIcon /> : <AddIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default AddProfileButton;
