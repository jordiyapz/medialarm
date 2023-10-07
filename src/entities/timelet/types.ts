export type TimeletId = string;

export interface BaseTimelet {
  id: TimeletId;
  name?: string;
  numOfRings: number;
  disabled: boolean;
}

export interface PlainTimelet extends BaseTimelet {
  start: string;
}
export interface Timelet extends BaseTimelet {
  start: Date;
}

export interface AlarmConfig {}
