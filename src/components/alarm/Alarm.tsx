import { TimeDisplay } from "../TimeDisplay";

import { AlarmConfig, Timelet, getDayOfWeek } from ".";
import { useAlarm } from "./hooks";

export type AlarmProps = {
  timetable: Timelet[];
  config: AlarmConfig;
};

export const Alarm = ({ timetable, config }: AlarmProps) => {
  const { timer, closestTime } = useAlarm(timetable, config);

  return (
    <>
      {closestTime ? (
        <TimeDisplay
          days={timer.days}
          hours={timer.hours}
          minutes={timer.minutes}
          seconds={timer.seconds}
        />
      ) : (
        "No alarm available"
      )}
      {closestTime && <div>Will ring {closestTime.numOfRings} times</div>}
      <hr />
      {timetable.map((t) => (
        <div
          key={t.id}
          style={t.id === closestTime?.id ? { fontWeight: "bold" } : {}}
        >
          #{t.id}. {getDayOfWeek(t.time.getDay())}, {t.time.getDate()}/
          {t.time.getMonth() + 1} | {t.time.getHours()}:{t.time.getMinutes()}
        </div>
      ))}
      {/* <audio ref={audioRef} src={ringtone}/> */}
    </>
  );
};
