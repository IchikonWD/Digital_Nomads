import React, { useState, useEffect } from "react";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider"
import Explore from "../Explore/Explore";

const Explore1 = ({ history }) => {
  const [internet, setInternet] = useState([1, 5]);
  const [safety, setSafety] = useState([1, 5]);
  const [living, setLiving] = useState([1, 5]);

  // const selectors = [
  //   {
  //     label: 'Internet connection',
  //     range: [1, 2, 3, 4, 5],
  //     min: "Low",
  //     max: "Supreme"
  //   },
  //   {
  //     label: 'Safety',
  //     range: [1, 2, 3, 4, 5],
  //     min: "Get out",
  //     max: "Safest"
  //   },
  //   {
  //     label: 'Cost of living',
  //     range: [1, 2, 3, 4, 5],
  //     min: "1000",
  //     max: "3000 eur/mo"
  //   },
  // ]

  const handleUserPrefs = (e) => {
    e.preventDefault();
    // setInternet()
    history.push('/explore2')
  }

  useEffect(() => {

  }, [history])

  return (
    <div className="explore">
      <h2>Choose your nomad needs</h2>
      <form onSubmit={handleUserPrefs}>
        <div className="needsContainer">
          <div className="need">
            <div className="need_name">
              <span>Internet connection</span>
              <ToggleSwitch label="Internet connection" />
            </div>
            <div className="ranges">
              <p>From Low to Supreme</p>
              {/* <MultiRangeSlider min={internet[0]} max={internet[1]} onChange={({ min, max }) => setInternet([min, max])}
              /> */}
            </div>
          </div>
          <div className="need">
            <div className="need_name">
              <span>Safety</span>
              <ToggleSwitch label="Safety" />
            </div>
            <div className="ranges">
              <p>From Get out to Safest</p>
              {/* <MultiRangeSlider min={safety[0]} max={safety[1]} onChange={({ min, max }) => setSafety([min, max])}
              /> */}
            </div>
          </div>
          <div className="need">
            <div className="need_name">
              <span>Cost of living</span>
              <ToggleSwitch label="Cost of living" />
            </div>
            <div className="ranges">
              <p>From 1000 to 3000 eur/mo</p>
              {/* <MultiRangeSlider min={living[0]} max={living[1]} onChange={({ min, max }) => setLiving([min, max])}
              /> */}
            </div>
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

export default Explore1;