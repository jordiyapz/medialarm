import { ListItemIcon, MenuItem, Portal } from "@mui/material";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { useOpenable } from "@/shared/lib";
import DuplicateByDateDialog from "./DuplicateByDateDialog";

const DuplicateByDateMenuItem = () => {
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
          <EventRepeatIcon />
        </ListItemIcon>
        Duplicate by Date
      </MenuItem>
      <Portal>
        <DuplicateByDateDialog open={open} onClose={handleClose} />
      </Portal>
    </>
  );
};

export default DuplicateByDateMenuItem;
