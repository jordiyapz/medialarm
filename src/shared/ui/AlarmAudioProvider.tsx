import { useAlarmAudio } from "../hooks/alarm-audio";
import { AlarmAudioContext } from "../contexts/alarm-audio";
import ringtone from "/singing-bowl.mp3";
import { alarmConfig } from "@/config";

type AlarmAudioPlayerProviderProps = {
  children: React.ReactNode;
};

const AlarmAudioPlayerProvider = ({
  children,
}: AlarmAudioPlayerProviderProps) => {
  const player = useAlarmAudio(ringtone, alarmConfig);

  return (
    <AlarmAudioContext.Provider value={player}>
      {children}
    </AlarmAudioContext.Provider>
  );
};

export default AlarmAudioPlayerProvider;
