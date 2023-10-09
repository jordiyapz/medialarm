import { createContext } from "react";
import { UseAlarmAudioReturns } from "../hooks/alarm-audio";

export const AlarmAudioContext = createContext<UseAlarmAudioReturns | null>(
  null
);
