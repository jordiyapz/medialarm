import { IconButton, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AlarmProfileList, AlarmProfileHeading } from "@/entities/alarm";

import DrawerFooter from "./DrawerFooter";
import { DrawerContent } from "./DrawerContent";
import { StyledDrawerProps, StyledDrawer } from "./StyledDrawer";

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
      <DrawerContent>
        <AlarmProfileHeading />
        <AlarmProfileList />
      </DrawerContent>
      <Divider />
      <DrawerFooter>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerFooter>
    </StyledDrawer>
  );
};
