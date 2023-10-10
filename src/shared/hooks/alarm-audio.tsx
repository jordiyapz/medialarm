import { useContext, useCallback, useEffect, useState } from "react";
import { AudioLoadOptions, useGlobalAudioPlayer } from "react-use-audio-player";

import { AlarmAudioContext } from "../contexts/alarm-audio";

export interface AudioConfig
  extends Omit<AudioLoadOptions, "loop" | "onend" | "autoplay"> {}

export type UseAlarmAudioReturns = ReturnType<typeof useAlarmAudio>;

export const useAlarmAudio = (src: string, config?: AudioConfig) => {
  const [loopCt, setLoopCt] = useState(0);
  const { load, play, playing, stop, ...player } = useGlobalAudioPlayer();

  const handleEnd = useCallback(() => {
    setLoopCt((ct) => (ct ? ct - 1 : ct));
  }, []);

  const loadAudio = useCallback(() => {
    load(src, {
      ...config,
      loop: true,
      onend: handleEnd,
      autoplay: false,
    });
  }, [src, handleEnd, load, config]);

  useEffect(() => {
    if (loopCt > 0) {
      if (!playing) play();
    } else {
      stop();
    }
  }, [loopCt, playing, stop, play]);

  const ring = (x: number) => {
    setLoopCt(x);
  };

  const stopRing = () => {
    setLoopCt(0);
  };

  return { ...player, ring, stopRing, play, playing, stop, loadAudio };
};

export const useAlarmAudioPlayer = () => {
  const context = useContext(AlarmAudioContext);
  if (context === null)
    console.error("You must wrap your app under the AlarmAudioPlayerProvider");
  return context;
};
