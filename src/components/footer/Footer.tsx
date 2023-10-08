import { AppBar, Container, IconButton, Stack, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NextAlarm } from "@/entities/alarm";

import { pallete } from "../../theme";
import { Credit } from "./Credit";

export type FooterProps = {
  open: boolean;
  drawerWidth: number;
  onMenuClick(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const Footer = ({ open, drawerWidth, onMenuClick }: FooterProps) => {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{
        ...theme.mixins.toolbar,
        background: pallete.grey300,
        marginRight: 0,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginRight: `${drawerWidth}px`,
        }),
      }}
    >
      <Container>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          sx={{ mt: 2, mb: 1 }}
        >
          <NextAlarm />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={onMenuClick}
            sx={{ ...(open && { display: "none" }) }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Stack>
        <Credit />
      </Container>
    </AppBar>
  );
};
