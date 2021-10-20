import React from "react";
import { shallow } from "enzyme";
import Home1 from "./Home1";

describe("Home1", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Home1 />);
    expect(wrapper).toMatchSnapshot();
  });
});
