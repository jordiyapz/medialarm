import { useContext, useCallback, useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

import { AlarmAudioContext } from "../contexts/alarm-audio";

export type UseAlarmAudioReturns = ReturnType<typeof useAlarmAudio>;

export const useAlarmAudio = (src: string) => {
  const [loopCt, setLoopCt] = useState(0);
  const { load, play, playing, stop, ...player } = useGlobalAudioPlayer();

  const handleEnd = useCallback(() => {
    setLoopCt((ct) => (ct ? ct - 1 : ct));
  }, []);

  const loadAudio = useCallback(() => {
    load(src, {
      loop: true,
      onend: handleEnd,
      autoplay: false,
    });
  }, [src, handleEnd, load]);

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
