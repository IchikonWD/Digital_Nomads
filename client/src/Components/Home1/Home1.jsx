import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home1 = () => {
  let history = useHistory();
  const [ search, setSearch ] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    let userInput = e.target.city.value
    let inputMod = userInput.charAt(0).toUpperCase() + userInput.slice(1)
    setSearch(inputMod)
    console.log(search);
    history.push(`/api/data/${inputMod}`)
  }
  return (
    <div className="home1">
      <form onSubmit={submitHandler}>
        <input type="text" name="city" />
        <p>Choose your next destination according to your nomad wantings</p>
        <button>Explore!</button>
      </form>
    </div>
  )
};

export default Home1;
