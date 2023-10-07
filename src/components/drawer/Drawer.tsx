import { Typography, IconButton, Box, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AlarmProfileList } from "@/entities/alarm";

import { DrawerHeader } from ".";
import { StyledDrawerProps, StyledDrawer } from "./StyledDrawerProps";

export type DrawerProps = Pick<StyledDrawerProps, "drawerWidth" | "open"> & {
  onClose(): void;
};

export const Drawer = ({ onClose, ...drawerProps }: DrawerProps) => {
  return (
    <StyledDrawer
      {...drawerProps}
      hideBackdrop
      onClose={(_, reason) => reason === "backdropClick" && onClose()}
      anchor="right"
    >
      <Box mx={2} mt={3}>
        <Typography variant="h1" fontWeight={700} fontSize="1.2rem">
          Alarm Profiles
        </Typography>
      </Box>
      <AlarmProfileList />
      <DrawerHeader>
        <Divider />
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
    </StyledDrawer>
  );
};
