import { ListItemIcon, MenuItem } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { useExportProfiles } from "../hooks";

const ExportMenuItem = () => {
  const exportProfiles = useExportProfiles();
  return (
    <MenuItem onClick={exportProfiles}>
      <ListItemIcon>
        <FileDownloadIcon />
      </ListItemIcon>
      Export Profiles
    </MenuItem>
  );
};

export default ExportMenuItem;
