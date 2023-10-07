import { AlarmProfile, PlainAlarmProfile } from "./types";

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
