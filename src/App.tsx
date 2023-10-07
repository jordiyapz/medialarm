import { Main } from "./components/main";
import { Footer } from "./components/footer";
import { Drawer } from "./components/drawer";
import { Box } from "@mui/material";
import { useState } from "react";

const drawerWidth = 350;

function App() {
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Main drawerWidth={drawerWidth} drawerOpen={open} />
      <Footer
        open={open}
        drawerWidth={drawerWidth}
        onMenuClick={handleOpenDrawer}
      />
      <Drawer
        open={open}
        onClose={handleOpenDrawer}
        drawerWidth={drawerWidth}
      />
    </Box>
  );
}

export default App;
