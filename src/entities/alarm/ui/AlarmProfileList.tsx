import { List } from "@mui/material";
import { useAppSelector } from "@/hooks/store";

import { AlarmListItem, rehydrateAlarmProfile } from "..";

const AlarmProfileList = () => {
  const alarm = useAppSelector((s) => s.alarm);

  return (
    <List>
      {alarm.profiles.map(rehydrateAlarmProfile).map((t) => (
        <AlarmListItem key={t.id} {...t} />
      ))}
    </List>
  );
};

export default AlarmProfileList;
