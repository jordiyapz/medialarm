import { PlainTimelet } from "./types";

export const toTimelet = (t: PlainTimelet) => ({
  ...t,
  start: new Date(t.start),
});
