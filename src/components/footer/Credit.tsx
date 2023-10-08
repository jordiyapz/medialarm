import { Stack, Typography, useTheme, StackProps } from "@mui/material";

export function Credit(props: StackProps) {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="space-between" {...props}>
      <Typography fontSize=".8rem" color={theme.palette.text.secondary}>
        Made with 💖 by Jordi Yaputra
      </Typography>
      <Typography fontSize=".8rem" color={theme.palette.text.secondary}>
        Version: {APP_VERSION}
      </Typography>
    </Stack>
  );
}
