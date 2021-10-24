import React from "react";
import { shallow } from "enzyme";
import Explore1 from "./Explore1";

describe("Explore1", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Explore1 />);
    expect(wrapper).toMatchSnapshot();
  });
});
