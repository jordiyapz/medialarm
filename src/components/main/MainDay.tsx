import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useTime } from "react-timer-hook";
import { Daylet } from "./Daylet";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function MainDay() {
  const [activeDay, setActiveDay] = useState(new Date().getDay());
  const time = useTime();

  /** Update active day every hours */
  useEffect(() => {
    setActiveDay(new Date().getDay());
  }, [time.hours]);

  return (
    <Stack direction="row" gap={3} justifyContent="center" flexWrap="wrap">
      {days.map((d, i) => (
        <Daylet key={d} active={i === activeDay}>
          {d}
        </Daylet>
      ))}
    </Stack>
  );
}
