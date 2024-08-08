import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { getCurrentTime } from "@/src/utils";
import { EMatchStatusVariant, ILastMatchStatistic, ITableItemProps } from "../types";

const useHome = () => {
  const [num, setNum] = useState<number>(0);
  const [isUnder, setIsUnder] = useState<boolean>(true);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [tableList, setTableList] = useState<ITableItemProps[]>([]);
  const [lastMatchStatistic, setLastMatchStatistic] = useState<ILastMatchStatistic | null>(null);

  const handleChange = (event: Event, newValue: number | number[]) => setSelectedValue(newValue as number);

  const getRandomNum = () => {
    const num = Math.floor(Math.random() * 101);
    const currentTime = getCurrentTime();
    const isWin = (isUnder && num < selectedValue) || (!isUnder && num > selectedValue);
    const guess = `${isUnder ? "Under" : "Over"} ${selectedValue}`;

    setNum(num);
    setLastMatchStatistic({
      status: isWin ? EMatchStatusVariant.SUCCESS : EMatchStatusVariant.ERROR,
      text: isWin ? "You win" : "You lost",
      subtext: isWin ? "" : `Number was ${num > selectedValue ? "higher" : "lower"}`,
    });

    setTableList(prev => {
      const updatedList = [...prev];
      updatedList.unshift({
        id: uuidv4(),
        time: currentTime,
        guess: guess,
        result: num,
        isWin: isWin,
      });
      if (updatedList.length > 10) {
        updatedList.pop();
      }
      return updatedList;
    });
  };
  return { lastMatchStatistic, num, isUnder, setIsUnder, selectedValue, tableList, handleChange, getRandomNum };
};

export default useHome;
