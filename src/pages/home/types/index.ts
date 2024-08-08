export interface ITableItemProps {
  id: string;
  time: string;
  guess: string;
  result: number;
  isWin: boolean;
}

export enum EMatchStatusVariant {
  SUCCESS = "success",
  ERROR = "error",
}

export interface ILastMatchStatistic {
  status: EMatchStatusVariant;
  text: string;
  subtext: string;
}
