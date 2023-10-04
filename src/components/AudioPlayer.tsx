import { createRef, useRef } from "react";
import ringtone from "/singing-bowl.mp3";

interface Timelet {
  time: Date;
  numOfRings: number;
}

const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPaused = audioRef.current?.paused;
  return { audioRef, isPaused };
};

const useAlarm = (timelets: Timelet[]) => {
  // Gives audio ref object and choose the closest time between timelets
  const { audioRef } = useAudio();
  const epochs = timelets.map((t) => t.time.getTime());
  const currentEpoch = new Date().getTime();
  const deltas = epochs
    .map((e) => e - currentEpoch)
    .map((e) => (e < 0 ? Infinity : e));
  const smallestDelta = Math.min(...deltas);
  const nearestTimeId =
    smallestDelta == Infinity
      ? null
      : deltas.findIndex((d) => d == smallestDelta);
  const closestTime = nearestTimeId ? timelets[nearestTimeId] : null;

  return { audioRef, closestTime };
};

const timelets: Timelet[] = [
  { time: new Date("2023-09-30T15:35:00Z"), numOfRings: 2 },
  { time: new Date("2023-09-30T01:34:00Z"), numOfRings: 3 },
  { time: new Date("2023-11-30T15:36:00Z"), numOfRings: 3 },
  { time: new Date("2023-09-23T16:36:00Z"), numOfRings: 3 },
  { time: new Date("2023-10-01T23:36:00Z"), numOfRings: 3 },
  { time: new Date("2023-10-02T12:36:00Z"), numOfRings: 3 },
];

export const AudioPlayer = () => {
  const { audioRef } = useAlarm(timelets);
  const handlePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) audioRef.current.play();
      else audioRef.current.pause();
    }
  };

  return <audio ref={audioRef} src={ringtone} />;
};

/**
 * alarm: timelet: time, rings
 */
