import { Button, List, ListItem } from "@mui/material";
import { useAppSelector } from "@/shared/hooks/store";

import { AlarmListItem, isExpired, rehydrateAlarmProfile } from "..";
import { useMemo } from "react";
import { selectAlarm } from "../alarm-slice";
import AlarmProfileForm from "./AlarmProfileForm";
import { useProfileForm } from "../hooks";

const AlarmProfileList = () => {
  const alarm = useAppSelector(selectAlarm);
  const profileForm = useProfileForm();
  const sortedProfiles = useMemo(() => {
    let profiles = [...alarm.profiles.map(rehydrateAlarmProfile)];
    profiles.sort((a, b) => a.start.getTime() - b.start.getTime());
    if (!alarm.showExpired) {
      profiles = profiles.filter((a) => !isExpired(a));
    }
    return profiles;
  }, [alarm]);
  
  const isEmpty = !sortedProfiles.length;

  return (
    <List>
      {profileForm.isOpen && profileForm.item === null && <AlarmProfileForm />}
      {isEmpty
        ? !profileForm.isOpen && (
            <ListItem sx={{ display: "flex", flexDirection: "column" }}>
              <Button variant="outlined" onClick={profileForm.open}>
                Add new alarm profile
              </Button>
            </ListItem>
          )
        : sortedProfiles.map((t) =>
            t.id === profileForm.item ? (
              <AlarmProfileForm key={t.id} values={t} />
            ) : (
              <AlarmListItem key={t.id} {...t} />
            )
          )}
    </List>
  );
};

export default AlarmProfileList;
