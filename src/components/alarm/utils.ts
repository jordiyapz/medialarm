import { AlarmProfile } from ".";

/** return the closest time between profiles */
export const findNearestTime = (profiles: AlarmProfile[]) => {
  const epochs = profiles.map((t) => t.start.getTime());
  const currentEpoch = new Date().getTime();
  const deltas = epochs
    .map((e) => e - currentEpoch)
    .map((e) => (e < 0 ? Infinity : e));
  const smallestDelta = Math.min(...deltas);
  const nearestTimeId =
    smallestDelta == Infinity
      ? null
      : deltas.findIndex((d) => d == smallestDelta);
  const closestTime = nearestTimeId !== null ? profiles[nearestTimeId] : null;
  return closestTime;
};

export const getDayOfWeek = (day: number) => {
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayOfWeek[day];
};
