import React from "react";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider"
import Explore from "../Explore/Explore";

const Explore2 = () => {
  const selectors = [
    {
      label: 'Average temperature',
      range: [10, 15, 20, 25, 35],
      min: "10°C",
      max: "35°C"
    },
    {
      label: 'Population',
      //! PREGUNTAR RANGE DE POPULATION
      range: [1, 2, 3, 4, 5],
      min: "3000",
      max: "4M hab."
    },

  ]
  const handleUserPrefs = (e) => {
    e.preventDefault();
    // history.push('/explore2') ?????
  }
  return (
    <div className="explore2">
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
                  <MultiRangeSlider min={selector.range[0]} max={selector.range[4]} onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                  />
                </div>
              </div>
            )
          })}
          <div className="need_name">
            <span><b> Coworking spaces near you</b></span>
            <ToggleSwitch label="coworking" />
          </div>
          <br />
          <Explore step2 />
          <button type='submit'>Next</button>
        </div>
      </form>
      {/* BORRAR BR */}
    </div>
  )
};

export default Explore2;