import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { AlarmConfig, AlarmProfile, findNearestTime } from ".";
import ringtone from "/singing-bowl.mp3";
import { useAlarmAudio } from "@/shared/hooks/alarm-audio";

export const useAlarm = (
  timetable: AlarmProfile[],
  config: AlarmConfig = {}
) => {
  const player = useAlarmAudio(ringtone, config);

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

  const { pause, restart } = timer;
  useEffect(() => {
    if (closestTime) restart(closestTime.start);
    return pause;
  }, [closestTime, pause, restart]);

  return {
    timer,
    closestTime,
    ring: player.ring,
  };
};
