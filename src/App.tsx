import { Box } from "@mui/material";
import { Main } from "@/components/main";
import { Footer } from "@/components/footer";
import { Drawer } from "@/components/drawer";
import { useOpenable } from "@/shared/lib";
import { useAllowAudio } from "@/shared/hooks/audio";

import { DEFAULT_DRAWER_OPEN, DRAWER_WIDTH } from "@/config";
import { useFlags } from "flagsmith/react";

function App() {
  const drawer = useOpenable(DEFAULT_DRAWER_OPEN);
  const flags = useFlags(["sponsorship"]);

  useAllowAudio();

  return (
    <Box sx={{ display: "flex" }}>
      <Main drawerWidth={DRAWER_WIDTH} drawerOpen={drawer.open} />
      <Footer
        open={drawer.open}
        drawerWidth={DRAWER_WIDTH}
        onMenuClick={drawer.toggle}
      />
      <Drawer
        open={drawer.open}
        onClose={drawer.toggle}
        drawerWidth={DRAWER_WIDTH}
        enableSponsorship={flags.sponsorship.enabled}
        sponsorshipLink={flags.sponsorship.value as string | undefined}
      />
    </Box>
  );
}

export default App;
