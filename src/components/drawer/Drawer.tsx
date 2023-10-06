import {
  Drawer,
  type DrawerProps,
  Typography,
  IconButton,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { DrawerHeader } from ".";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { pallete } from "../../theme";

export type AlarmDrawerProps = Pick<DrawerProps, "open"> & {
  onClose(): void;
  drawerWidth: number;
};

export const AlarmDrawer = ({
  drawerWidth,
  onClose,
  ...drawerProps
}: AlarmDrawerProps) => {
  return (
    <Drawer
      {...drawerProps}
      hideBackdrop
      onClose={(_, reason) => reason === "backdropClick" && onClose()}
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          background: pallete.bgDrawer,
          width: drawerWidth,
        },
      }}
    >
      <Box>
        <Typography>Alarm List</Typography>
      </Box>
      <List>
        <ListItem disablePadding> 
        <ListItemButton>
          <ListItemText>hehehe</ListItemText>
        </ListItemButton>
        </ListItem>
      </List>
      <DrawerHeader>
        <Divider />
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
    </Drawer>
  );
};
