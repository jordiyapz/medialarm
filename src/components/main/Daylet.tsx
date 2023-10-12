import { Typography, useTheme } from "@mui/material";
import React from "react";

export function Daylet({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  const theme = useTheme();
  return (
    <Typography
      textTransform="uppercase"
      color={active ? theme.palette.text.primary : theme.palette.text.disabled}
      sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
    >
      {children}
    </Typography>
  );
}
