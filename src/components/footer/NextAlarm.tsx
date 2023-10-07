import {
  Box, IconButton,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

export function NextAlarm() {
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
          <Box>
            <Typography fontSize="1.4rem" lineHeight={1.1}>
              16:20
            </Typography>
            <Typography fontSize=".8rem" fontWeight={100} color="primary">
              (+1 day)
            </Typography>
          </Box>
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
