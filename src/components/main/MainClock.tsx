import { Stack, Typography } from "@mui/material";
import { pallete } from "../../theme";

export function MainClock() {
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
        14:46
      </Typography>
      <Typography
        variant="subtitle1"
        fontSize="40px"
        color={pallete.grey400}
        sx={{ position: "relative", bottom: -30 }}
      >
        35
      </Typography>
    </Stack>
  );
}
