export const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "2-digit",
};

export const initialAlarmProfiles = [
  {
    numOfRings: 3,
    start: "2023-10-07T08:00:00",
  },
  {
    start: "2023-10-07T11:10:00",
  },
  {
    numOfRings: 3,
    start: "2023-10-05T14:10:00",
  },
  {
    numOfRings: 4,
    start: "2023-10-07T10:10:00",
  },
].map((data, i) => ({
  id: String(i),
  disabled: false,
  numOfRings: data.numOfRings ?? 1,
  start: new Date(data.start),
}));
