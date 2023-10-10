import { List } from "@mui/material";
import { useAppSelector } from "@/shared/hooks/store";

import { AlarmListItem, isExpired, rehydrateAlarmProfile } from "..";
import { useMemo } from "react";
import { selectAlarm } from "../alarm-slice";
import AlarmProfileForm from "./AlarmProfileForm";

const AlarmProfileList = () => {
  const alarm = useAppSelector(selectAlarm);
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
      <AlarmProfileForm />
      {sortedProfiles.map((t) => (
        <AlarmListItem key={t.id} {...t} />
      ))}
    </List>
  );
};

export default AlarmProfileList;
