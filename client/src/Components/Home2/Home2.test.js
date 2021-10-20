import React from "react";
import { shallow } from "enzyme";
import Home2 from "./Home2";

describe("Home2", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Home2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
