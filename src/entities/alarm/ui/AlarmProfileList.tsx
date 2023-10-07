import { List } from "@mui/material";
import { useAppSelector } from "@/hooks/store";

import { AlarmListItem, isExpired, rehydrateAlarmProfile } from "..";
import { useMemo } from "react";

const AlarmProfileList = () => {
  const alarm = useAppSelector((s) => s.alarm);
  const sortedProfiles = useMemo(() => {
    let profiles = [...alarm.profiles.map(rehydrateAlarmProfile)];
    profiles.sort((a, b) => a.start.getTime() - b.start.getTime());
    if (!alarm.showExpired) {
      profiles = profiles.filter((a) => !isExpired(a));
    }
    return profiles;
  }, [alarm]);
  return (
    <List>
      {sortedProfiles.map((t) => (
        <AlarmListItem key={t.id} {...t} />
      ))}
    </List>
  );
};

export default AlarmProfileList;
