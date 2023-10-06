import { Stack, Typography, useTheme } from "@mui/material";

export function Credit() {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography fontSize=".8rem" color={theme.palette.text.secondary}>
        Made with 💖 by Jordi Yaputra
      </Typography>
      <Typography fontSize=".8rem" color={theme.palette.text.secondary}>
        Version: {APP_VERSION}
      </Typography>
    </Stack>
  );
}
