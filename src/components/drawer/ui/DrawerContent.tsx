import { styled } from "@mui/material";

export const DrawerContent = styled("div")(({ theme }) => ({
  overflow: "auto",
  height: `calc(100vh - ${theme.mixins.toolbar.height})`,
}));
