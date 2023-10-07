import { IconButton, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AlarmProfileList, AlarmProfileHeading } from "@/entities/alarm";

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
      <AlarmProfileHeading />
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
