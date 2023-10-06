import {
  Drawer,
  type DrawerProps,
  Typography,
  IconButton,
  List,
  Box,
  ListItem,
  ListItemButton,
  Divider,
  Switch,
  Stack,
  FormLabel,
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
      <Box mx={2} mt={3}>
        <Typography variant="h1" fontWeight={700} fontSize="1.2rem">
          Alarm List
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding sx={{ alignItems: "stretch" }}>
          <ListItemButton>
            <Stack>
              <Typography color={pallete.grey400}>Sun, 13 Oct 2023</Typography>
              <Typography fontSize="1.4rem" fontWeight={100}>
                08:00
              </Typography>
              <Typography color={pallete.grey400} fontWeight={100}>
                ring once
              </Typography>
            </Stack>
          </ListItemButton>
          <FormLabel sx={{ pr: 3, display: "flex", alignItems: "center" }}>
            <Switch edge="end" />
          </FormLabel>
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
