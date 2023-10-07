import { PlainAlarmProfile } from "./types";

/**Deserialize plain alarm profile (usually from store) into workable alarm profile
 */
export const rehydrateAlarmProfile = (t: PlainAlarmProfile) => ({
  ...t,
  start: new Date(t.start),
});
