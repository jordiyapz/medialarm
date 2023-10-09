import { useAlarmAudioPlayer } from "./alarm-audio";
import { useConfirm } from "material-ui-confirm";
import { useEffect } from "react";

export const useAllowAudio = () => {
  const player = useAlarmAudioPlayer();
  const { isReady, loadAudio } = player || {};

  const confirm = useConfirm();

  useEffect(() => {
    if (!isReady) {
      confirm({
        title: "Allow this app to play audio?",
        description:
          "In order that this application can play the alarm sound you must permit it to play audio.",
        dialogProps: { maxWidth: "md" },
        confirmationText: "Yes, I Allow",
        cancellationText: "I just want to hang around",
        allowClose: false,
        confirmationButtonProps: { autoFocus: true },
      })
        .then(loadAudio)
        .catch(() => {
          confirm({
            title: "Understandable.",
            description:
              "Please enable audio playback anytime from the button below to the left. Have a good day!",
            dialogProps: { maxWidth: "xs" },
            hideCancelButton: true,
          });
        });
    }
  }, [isReady, confirm, loadAudio]);
};
