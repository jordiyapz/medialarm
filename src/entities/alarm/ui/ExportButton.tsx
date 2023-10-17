import { IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useExportProfiles } from "../hooks";

const ExportButton = () => {
  const exportProfiles = useExportProfiles();
  return (
    <Tooltip title="Export alarm profiles">
      <IconButton color="secondary" onClick={exportProfiles}>
        <FileDownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ExportButton;
