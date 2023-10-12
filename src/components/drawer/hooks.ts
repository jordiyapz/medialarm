import { useMediaQuery, useTheme } from "@mui/material";
import { useOpenable } from "@/shared/lib";
import { DefaultDrawerState } from ".";

export const useDrawerState = (defaultState: DefaultDrawerState) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));

  const defaultOpenState = ((state) => {
    if (state === "always") return true;
    if (state === "adaptive") return match;
    return false;
  })(defaultState);

  const drawer = useOpenable(defaultOpenState);
  return drawer;
};
