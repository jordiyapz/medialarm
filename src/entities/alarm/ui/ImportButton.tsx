import FileUploadIcon from "@mui/icons-material/FileUpload";
import { IconButton, Tooltip } from "@mui/material";

const ImportButton = () => {
  return (
    <Tooltip title="Import profiles">
      <IconButton color="secondary">
        <FileUploadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ImportButton;
