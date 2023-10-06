import { Container } from "@mui/material";
import { MainClock } from "./MainClock";
import { MainDay } from "./MainDay";

export const Main = () => {
  return (
    <main>
      <Container
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <MainClock />
        <MainDay />
      </Container>
    </main>
  );
};
