import { useAppDispatch } from "@/shared/hooks/store";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import { FileUploader } from "react-drag-drop-files";

type ImportDialogProps = {
  open: boolean;
  onClose(): void;
};

const ImportDialog = ({ open, onClose }: ImportDialogProps) => {
  const dispatch = useAppDispatch();
  const [newProfiles, setNewProfiles] = useState<Record<string, string>[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (e) {
      if (typeof e.target?.result === "string") {
        try {
          const data = JSON.parse(e.target.result);
          if (Array.isArray(data)) {
            setNewProfiles(data);
          }
        } catch (error) {
          console.error("Unable to parse file");
        }
      }
    };
  };
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "2px solid gray",
            borderRadius: 1.5,
            mb: 2,
            px: 1,
            py: 1.5,
          }}
        >
          <TextField
            id="name"
            autoFocus
            variant="outlined"
            margin="dense"
            label="Input your file url here"
            placeholder="File url (Example: https://gist.github.com/...)"
            type="url"
            fullWidth
            onChange={handleUrlChange}
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography color="GrayText">OR</Typography>
          </Box>
          <FileUploader
            handleChange={handleFileUpload}
            name="file"
            types={["json"]}
          />
          {file?.name && (
            <Typography color={"GrayText"} variant="caption">
              Filename: {file.name}
            </Typography>
          )}
        </Box>
        <Alert severity="warning">
          This will permanently overwrite current saved profile
        </Alert>
        <Box maxHeight={300} overflow="auto">
          <List dense>
            {newProfiles.map((profile) => (
              <ListItem key={profile.id}>
                <ListItemText
                  primary={profile.name}
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
        <Button disabled={!newProfiles} onClick={handleUpload}>Overwrite</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportDialog;
