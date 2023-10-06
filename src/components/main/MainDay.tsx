import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

function Daylet({
  children,
  active = false,
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

type Day = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export function MainDay() {
  const activeDay: Day = "wed";

  return (
    <Stack direction="row" gap={3} justifyContent="center">
      {(["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as Day[]).map((d) => (
        <Daylet key={d} active={d === activeDay}>
          {d}
        </Daylet>
      ))}
    </Stack>
  );
}
