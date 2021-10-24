import React, { useState } from "react";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider"
import Explore from "../Explore/Explore";

const Explore1 = ({ history }) => {
  // const [internet, setInternet] = useState("");
  // const [safety, setSafety] = useState("");
  // const [living, setLiving] = useState("");

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
  const handleUserPrefs = (e) => {
    e.preventDefault();
    history.push('/explore2')
  }
  return (
    <div className="explore">
      <h2>Choose your nomad needs</h2>
      <form onSubmit={handleUserPrefs}>
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
                  <MultiRangeSlider min={selector.range[0]} max={selector.range[4]} onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`) }
                  />
                  {/* <input type="range" min={selector.range[0]} max={selector.range[4]} /> */}
                </div>
              </div>
            )
          })}
          <br />
          <Explore step2 />
          <button type='submit'>Next</button>
        </div>
      </form>
      {/* BORRAR BR */}
    </div>
  )
};

export default Explore1;