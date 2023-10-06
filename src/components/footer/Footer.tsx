import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { pallete } from "../../theme";
import { Credit } from "./Credit";
import NotificationsOff from "@mui/icons-material/NotificationsOff";

function NextAlarm() {
  const theme = useTheme();
  return (
    <Stack direction="row">
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
        <NotificationsOff />
      </IconButton>
    </Stack>
  );
}

export const Footer = () => {
  return (
    <footer>
      <Container
        sx={{ background: pallete.grey300, position: "absolute", bottom: 0 }}
      >
        <Stack direction="row" justifyContent="end" sx={{ mt: 2, mb: 1 }}>
          <NextAlarm />
        </Stack>
        <Credit />
      </Container>
    </footer>
  );
};
