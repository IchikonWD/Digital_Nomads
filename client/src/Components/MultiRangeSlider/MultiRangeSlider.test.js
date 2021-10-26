import React from "react";
import { shallow } from "enzyme";
import MultiRangeSlider from "./MultiRangeSlider";

describe("MultiRangeSlider", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MultiRangeSlider />);
    expect(wrapper).toMatchSnapshot();
  });
});
