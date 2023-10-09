import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { AlarmConfig, AlarmProfile, findNearestTime } from ".";
import { useAlarmAudio } from "../../shared/hooks/audio-player";
import ringtone from "/singing-bowl.mp3";

export const useAlarm = (timetable: AlarmProfile[], _config: AlarmConfig) => {
  const player = useAlarmAudio(ringtone);

  const [closestTime, setClosestTime] = useState<AlarmProfile | null>(null);

  const handleTimeout = () => {
    if (closestTime) player.ring(closestTime.numOfRings);

    const newClosestTime = findNearestTime(timetable);
    setClosestTime(newClosestTime);
  };

  const timer = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: handleTimeout,
  });

  useEffect(() => {
    const newClosestTime = findNearestTime(timetable);
    setClosestTime(newClosestTime);
  }, [timetable]);

  useEffect(() => {
    if (closestTime) timer.restart(closestTime.start);
    return timer.pause;
  }, [closestTime]);

  return {
    timer,
    closestTime,
    ring: player.ring,
  };
};
