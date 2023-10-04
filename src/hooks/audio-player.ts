import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export const useAlarmAudio = (src: string) => {
  const [loopCt, setLoopCt] = useState(0);
  const player = useGlobalAudioPlayer();
  
  const handleEnd = () => {
    setLoopCt((ct) => (ct ? ct - 1 : ct));
  };

  useEffect(() => {
    player.load(src, {
      loop: true,
      onend: handleEnd,
    });
  }, [player.load]);

  useEffect(() => {
    if (loopCt > 0) {
      if (!player.playing) player.play();
    } else {
      player.stop();
    }
  }, [loopCt, player]);

  const ring = (x: number) => {
    setLoopCt(x);
  };

  const stopRing = () => {
    setLoopCt(0);
  };

  return { ...player, ring, stopRing };
};
