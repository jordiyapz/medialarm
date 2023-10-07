import {
  Drawer as MuiDrawer,
  type DrawerProps as MuiDrawerProps, styled
} from "@mui/material";
import { pallete } from "@/theme";

export type StyledDrawerProps = MuiDrawerProps & {
  drawerWidth: number;
};
export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "drawerWidth",
})<StyledDrawerProps>(({ drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    background: pallete.bgDrawer,
    width: drawerWidth,
  },
}));
