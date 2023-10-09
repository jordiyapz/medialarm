import { createContext, useContext } from "react";
import { useAlarmAudio } from "./hooks/audio-player";

type UseAlarmAudioReturns = ReturnType<typeof useAlarmAudio>;

export const AlarmAudioContext = createContext<UseAlarmAudioReturns | null>(
  null
);

export const useAlarmAudioPlayer = () => {
  const context = useContext(AlarmAudioContext);
  if (context === null)
    console.error("You must provide a context for AlarmAudioPlayer");
  return context;
};
