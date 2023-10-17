import { ListItemIcon, MenuItem, Portal } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileUpload";
import ImportDialog from "./ImportDialog";
import { useOpenable } from "@/shared/lib";

const ImportMenuItem = () => {
  const { open, setOpen } = useOpenable(false);
  const handleImport = () => {
    if (open) return;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleImport}>
        <ListItemIcon>
          <FileDownloadIcon />
        </ListItemIcon>
        Import Profiles
      </MenuItem>
      <Portal>
        <ImportDialog open={open} onClose={handleClose} />
      </Portal>
    </>
  );
};

export default ImportMenuItem;
