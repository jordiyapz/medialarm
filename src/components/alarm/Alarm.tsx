import { TimeDisplay } from "../TimeDisplay";

import { AlarmConfig, Timelet, getDayOfWeek } from ".";
import { useAlarm } from "./hooks";

export type AlarmProps = {
  timetable: Timelet[];
  config: AlarmConfig;
  // ref: MutableRefObject<AlarmRef>;
};

export const Alarm = ({ timetable, config }: AlarmProps) => {
  const { timer, closestTime , ring} = useAlarm(timetable, config);

  // console.debug(closestTime?.time);
  return (
    <>
    <button onClick={() => ring(3)}>Ring</button>
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
