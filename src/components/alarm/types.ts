export type TimeletId = string;

export interface Timelet {
  id: TimeletId;
  name?: string;
  time: Date;
  numOfRings: number;
}

export interface AlarmConfig {}
