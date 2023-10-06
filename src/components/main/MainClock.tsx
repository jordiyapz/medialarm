import { Stack, Typography } from "@mui/material";
import { pallete } from "../../theme";
import { useTime } from "react-timer-hook";

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
        fontSize="13rem"
        fontWeight={100}
        lineHeight={1.3}
      >
        {time.hours}:{String(time.minutes).padStart(2, "0")}
      </Typography>
      <Typography
        variant="subtitle1"
        fontSize="40px"
        color={pallete.grey400}
        sx={{ position: "relative", bottom: -30 }}
      >
        {String(time.seconds).padStart(2, "0")}
      </Typography>
    </Stack>
  );
}
