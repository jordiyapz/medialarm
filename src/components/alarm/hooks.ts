import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { AlarmConfig, Timelet, findNearestTime } from ".";
import { useAlarmAudio } from "../../hooks/audio-player";
import ringtone from "/singing-bowl.mp3";

export const useAlarm = (
  // audioRef: Ract.RefObject<HTMLAudioElement>,
  timetable: Timelet[],
  _config: AlarmConfig
) => {
  const player = useAlarmAudio(ringtone);

  const [closestTime, setClosestTime] = useState<Timelet | null>(null);

  const handleTimeout = async () => {
    console.debug("Timeout occured");
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
    console.debug("Update closest time");
    const newClosestTime = findNearestTime(timetable);
    setClosestTime(newClosestTime);
  }, [timetable]);

  useEffect(() => {
    console.debug({ closestTime });
    if (closestTime) {
      console.debug("Update timer");
      timer.restart(closestTime.time);
      // timer.start();
    }
    return timer.pause;
  }, [closestTime]);

  return {
    timer,
    closestTime,
    ring: player.ring,
    // audio: { loop, playing }
  };
};
