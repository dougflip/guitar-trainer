export type Milliseconds = number;
export type Seconds = number;
export type Minutes = number;
export type BPM = number;
export type ZeroToOneHundred = number;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
