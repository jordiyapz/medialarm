import { Typography, useTheme } from "@mui/material";
import React from "react";

export function Daylet({
  children, active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  const theme = useTheme();
  return (
    <Typography
      fontSize=".9rem"
      textTransform="uppercase"
      color={active ? theme.palette.text.primary : theme.palette.text.disabled}
    >
      {children}
    </Typography>
  );
}
