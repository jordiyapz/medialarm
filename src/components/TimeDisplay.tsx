export type TimeDisplayProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const TimeDisplay = ({
  days,
  hours,
  minutes,
  seconds,
}: TimeDisplayProps) => {
  return (
    <div>
      {days} days, {hours}:{minutes}:{seconds}
    </div>
  );
};
