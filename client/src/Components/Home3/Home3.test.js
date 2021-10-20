import React from "react";
import { shallow } from "enzyme";
import Home3 from "./Home3";

describe("Home3", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Home3 />);
    expect(wrapper).toMatchSnapshot();
  });
});
