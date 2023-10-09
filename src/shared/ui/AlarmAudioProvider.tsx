import { useAlarmAudio } from "../hooks/alarm-audio";
import ringtone from "/singing-bowl.mp3";
import { AlarmAudioContext } from "../contexts/alarm-audio";

type AlarmAudioPlayerProviderProps = {
  children: React.ReactNode;
};

const AlarmAudioPlayerProvider = ({
  children,
}: AlarmAudioPlayerProviderProps) => {
  const player = useAlarmAudio(ringtone);
  return (
    <AlarmAudioContext.Provider value={player}>
      {children}
    </AlarmAudioContext.Provider>
  );
};

export default AlarmAudioPlayerProvider;
