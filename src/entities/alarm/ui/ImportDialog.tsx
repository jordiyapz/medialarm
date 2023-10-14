import { useAppDispatch } from "@/shared/hooks/store";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ListItem,
  ListItemText,
  List,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { appendAlarmProfile } from "../alarm-slice";
import { PlainAlarmProfile } from "..";

type ImportDialogProps = {
  open: boolean;
  onClose(): void;
};

const ImportDialog = ({ open, onClose }: ImportDialogProps) => {
  const dispatch = useAppDispatch();
  const [newProfiles, setNewProfiles] = useState<Record<string, string>[]>([]);
  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      const url = e.currentTarget.value;
      try {
        const x = await fetch(url);
        const payload = JSON.parse(await x.text());
        setNewProfiles(payload);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const handleUpload = () => {
    newProfiles.forEach((profile) => {
      dispatch(appendAlarmProfile(profile as unknown as PlainAlarmProfile));
    });
    setNewProfiles([]);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Import Profile</DialogTitle>
      <DialogContent>
        <DialogContentText>Input your file url here</DialogContentText>
        <TextField
          id="name"
          autoFocus
          variant="outlined"
          margin="dense"
          label="File URL"
          type="url"
          fullWidth
          onChange={handleUrlChange}
        />
        <Alert severity="warning">
          This will permanently overwrite current saved profile
        </Alert>
        <Box maxHeight={300} overflow="auto">
          <List dense>
            {newProfiles.map((profile) => (
              <ListItem key={profile.id}>
                <ListItemText
                  primary={profile.id}
                  secondary={
                    <>
                      <Typography>Start: {profile.start}</Typography>
                      <Typography>Rings: {profile.numOfRings}</Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpload}>Overwrite</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportDialog;
