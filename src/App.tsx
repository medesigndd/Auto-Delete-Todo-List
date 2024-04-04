import { useEffect, useState } from "react";

import "./styles.css";
import { datas } from "./data";
import { objectType } from "./types";
import { VEGETABLE, FRUIT } from "./constant";

export default function App() {
  const [dataList, setDataList] = useState<Array<objectType>>(datas);
  const [fruits, setFruits] = useState<Array<objectType>>([]);
  const [vegetables, setVegetables] = useState<Array<objectType>>([]);

  const handleRemoveItem = (data: objectType) => {
    setDataList(dataList.filter((list) => list.name !== data.name));
  };

  const handleData = (data: objectType) => {
    const date = new Date();
    const nextFiveSec = new Date(date.getTime() + 5000);
    if (data.type === FRUIT)
      setFruits((prev) => [...prev, { ...data, timeStamp: nextFiveSec }]);
    if (data.type === VEGETABLE)
      setVegetables((prev) => [...prev, { ...data, timeStamp: nextFiveSec }]);
    handleRemoveItem(data);
    return;
  };

  const handleRackToList = (array: objectType[]): void => {
    array.map((element: objectType): void => {
      const date = new Date();
      const getCurrentSec = date.getSeconds();
      const getDataSec = new Date(element.timeStamp).getSeconds();
      if (getCurrentSec === getDataSec || getCurrentSec > getDataSec) {
        if (element.type === FRUIT) {
          setFruits(fruits.filter((list) => list.name !== element.name));
          setDataList((prev) => [
            ...prev,
            { ...element, timeStamp: new Date() },
          ]);
        }

        if (element.type === VEGETABLE) {
          setVegetables(
            vegetables.filter((list) => list.name !== element.name),
          );
          setDataList((prev) => [
            ...prev,
            { ...element, timeStamp: new Date() },
          ]);
        }
      }

      return;
    });
  };

  useEffect(() => {
    const array = [...fruits, ...vegetables];
    const interval = setInterval(() => {
      if (array.length > 0) handleRackToList(array);
    }, 1000);
    return () => clearInterval(interval);
  }, [fruits, vegetables]);

  return (
    <div className="App">
      <div className="data-list-container">
        {dataList.map((data: objectType, index): React.ReactElement => {
          return (
            <div className="data-list-content" key={`${data.name}-${index}`}>
              <button className="data-button" onClick={() => handleData(data)}>
                {data.name}
              </button>
            </div>
          );
        })}
      </div>
      <div className="fruit-container">
        <h3>Fruit</h3>
        <div className="fruit-content">
          {fruits.map((fruit: objectType, index): React.ReactElement => {
            return (
              <div className="data-list-content" key={`${fruit.name}-${index}`}>
                <button className="data-button">{fruit.name}</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="vegetable-container">
        <h3>Vegetable</h3>
        <div className="fruit-content">
          {vegetables.map(
            (vegetable: objectType, index): React.ReactElement => {
              return (
                <div
                  className="data-list-content"
                  key={`${vegetable.name}-${index}`}
                >
                  <button className="data-button">{vegetable.name}</button>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
