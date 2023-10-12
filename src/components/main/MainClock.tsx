import { Stack, Typography } from "@mui/material";
import { useTime } from "react-timer-hook";

import { pallete } from "../../theme";

export function MainClock() {
  const time = useTime();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="baseline"
      sx={{ pl: 5 }}
    >
      <Typography
        variant="body1"
        fontWeight={100}
        lineHeight={1.3}
        sx={{ fontSize: { md: "13rem", sm: "10rem", xs: "6rem" } }}
      >
        {time.hours}:{String(time.minutes).padStart(2, "0")}
      </Typography>
      <Typography
        variant="subtitle1"
        color={pallete.grey400}
        sx={{
          position: "relative",
          bottom: { md: -30, xs: -20 },
          fontSize: { md: "40px", xs: "20px" },
        }}
      >
        {String(time.seconds).padStart(2, "0")}
      </Typography>
    </Stack>
  );
}
