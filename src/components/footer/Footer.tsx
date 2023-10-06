import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { pallete } from "../../theme";
import { Credit } from "./Credit";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function NextAlarm() {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center">
      <Box>
        <Typography
          component="h1"
          fontSize="1.2rem"
          color={theme.palette.text.secondary}
        >
          Next Alarm
        </Typography>
        <Stack direction="row" alignItems="flex-end" gap={1.5}>
          <Stack alignItems="center">
            <Typography fontSize="1.4rem" lineHeight={1.1}>
              16:20
            </Typography>
            <Typography fontSize=".8rem" fontWeight={100}>
              (+1day)
            </Typography>
          </Stack>
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={100}
              fontSize=".9rem"
              color={theme.palette.text.secondary}
            >
              will ring in
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              1 day, 1h 14m 45s
            </Typography>
          </Box>
        </Stack>
      </Box>
      <IconButton aria-label="turn-off" size="large" color="secondary">
        <NotificationsOffIcon />
      </IconButton>
    </Stack>
  );
}

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
