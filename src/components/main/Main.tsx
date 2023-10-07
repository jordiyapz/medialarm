import { Container, Box, useTheme } from "@mui/material";
import { MainClock } from "./MainClock";
import { MainDay } from "./MainDay";
import { DrawerHeader } from "../drawer";
import { useAlarm } from "../alarm/hooks";
import { useAppSelector } from "@/hooks/store";

export type MainProps = {
  drawerWidth: number;
  drawerOpen: boolean;
};

export const Main = ({ drawerWidth, drawerOpen }: MainProps) => {
  const theme = useTheme();
  // const timelets = useAppSelector()
  // const alarm = useAlarm()
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        // pr: `${drawerWidth}px`,
        mr: `-${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "max-width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(drawerOpen && {
          maxWidth: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["margin", "max-width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          mr: 0,
        }),
      }}
    >
      <DrawerHeader />
      <Container
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <MainClock />
        <MainDay />
      </Container>
    </Box>
  );
};
