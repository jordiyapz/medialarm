import { IconButton, Divider, Button, Link, Stack } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

import { AlarmProfileList, AlarmProfileHeading } from "@/entities/alarm";

import DrawerFooter from "./DrawerFooter";
import { DrawerContent } from "./DrawerContent";
import { StyledDrawerProps, StyledDrawer } from "./StyledDrawer";

export type DrawerProps = Pick<StyledDrawerProps, "drawerWidth" | "open"> & {
  onClose(): void;
  enableSponsorship?: boolean;
  sponsorshipLink?: string;
};

export const Drawer = ({
  onClose,
  enableSponsorship = false,
  sponsorshipLink = "#",
  ...drawerProps
}: DrawerProps) => {
  return (
    <StyledDrawer
      {...drawerProps}
      hideBackdrop
      onClose={(_, reason) => reason === "backdropClick" && onClose()}
      variant="persistent"
      anchor="right"
    >
      <DrawerContent>
        <AlarmProfileHeading />
        <AlarmProfileList />
      </DrawerContent>
      <Divider />
      <DrawerFooter sx={{ display: "flex", width: "100%" }}>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
        <Stack flexGrow={1} justifyContent="center">
          {enableSponsorship && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<LocalCafeIcon />}
              component={Link}
              href={sponsorshipLink}
              target="_blank"
              rel="noopener"
            >
              Buy me a coffee
            </Button>
          )}
        </Stack>
      </DrawerFooter>
    </StyledDrawer>
  );
};
