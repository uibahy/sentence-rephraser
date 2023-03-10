import React from "react";
import { useRef, useState, useEffect } from "react";

type Props = {
  name: string;
  segments: any;
  callback: any;
  defaultIndex: number;
  controlRef: any;
};

function SegmentedControl({
  name,
  segments,
  callback,
  defaultIndex = 0,
  controlRef,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const onInputChange = (value: any, index: number) => {
    setActiveIndex(index);
    callback(value, index);
  };

  return (
    <div className={"controls-container"} ref={controlRef}>
      <div className="controls">
        {segments.map((item: any, i: any) => (
          <div
            key={item.value}
            className={`segment ${i === activeIndex ? "active" : "inactive"}`}
            ref={item.ref}
          >
            <input
              type="radio"
              value={item.value}
              id={item.label}
              name={name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SegmentedControl;
