import React from "react";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Explore1 = () => {
  const selectors = [
    {
      label: 'Internet connection',
      range: [1, 2, 3, 4, 5],
      min: "Low",
      max: "Supreme"
    },
    {
      label: 'Safety',
      range: [1, 2, 3, 4, 5],
      min: "Get out",
      max: "Safest"
    },
    {
      label: 'Cost of living',
      range: [1, 2, 3, 4, 5],
      min: "1000",
      max: "3000 eur/mo"
    },

  ]
  return (
    <div className="explore">
      <h2>Choose your nomad needs</h2>
      <div className="needsContainer">
        {selectors.map((selector, i) => {
          return (
            <div className="need" key={i}>
              <div className="need_name">
                <span>{selector.label}</span>
                <ToggleSwitch label={selector.label} />
              </div>
              <div className="ranges">
                <p>From {selector.min} to {selector.max}</p>
                <input type="range" min={selector.range[0]} max={selector.range[4]}/>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Explore1;