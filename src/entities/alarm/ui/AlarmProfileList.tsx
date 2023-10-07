import { useEffect } from "react";
import { List } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/store";

import { initialAlarmProfiles } from "../config";
import { addAlarmProfiles, removeAllAlarmProfiles } from "../alarm-slice";
import {
  AlarmListItem,
  rehydrateAlarmProfile,
  serializeAlarmProfile,
} from "..";

const AlarmProfileList = () => {
  const alarm = useAppSelector((s) => s.alarm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addAlarmProfiles(initialAlarmProfiles.map(serializeAlarmProfile)));
    return () => {
      dispatch(removeAllAlarmProfiles());
    };
  }, [dispatch]);

  return (
    <List>
      {alarm.profiles.map(rehydrateAlarmProfile).map((t) => (
        <AlarmListItem key={t.id} {...t} />
      ))}
    </List>
  );
};

export default AlarmProfileList;
