import { nanoid } from "@reduxjs/toolkit";
import { AlarmProfile, AlarmProfileId, PlainAlarmProfile } from "./types";

/** Deserialize plain alarm profile (usually from store) into workable alarm profile */
export const rehydrateAlarmProfile = (
  profile: PlainAlarmProfile
): AlarmProfile => ({
  ...profile,
  start: new Date(profile.start),
});

/** Serialize alarm profile so that it can be stored in the store */
export const serializeAlarmProfile = (
  profile: AlarmProfile
): PlainAlarmProfile => ({
  ...profile,
  start: profile.start.toISOString(),
});

/** Calculate whether a profile has been expired */
export const isExpired = (profile: AlarmProfile): boolean =>
  profile.start.getTime() < Date.now();

export const findNextAlarm = (
  profiles: AlarmProfile[]
): AlarmProfile | null => {
  const activeProfiles = [
    ...profiles.filter((p) => !isExpired(p)).filter((p) => !p.disabled),
  ];
  if (!activeProfiles.length) return null;

  activeProfiles.sort((a, b) => a.start.getTime() - b.start.getTime());
  return activeProfiles[0];
};

export const getTimeString = (date: Date): string => {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
};

export const newProfileId = (): AlarmProfileId => nanoid(10);

/** To be used inside add alarm profiles action, receive alarm profile, returns plain alarm profile */
export const createProfile = ({
  start,
  ...profile
}: Pick<AlarmProfile, "start"> & Partial<AlarmProfile>): PlainAlarmProfile => {
  return serializeAlarmProfile({
    start,
    disabled: profile.disabled ?? false,
    id: newProfileId(),
    numOfRings: profile.numOfRings ?? 1,
  });
};
