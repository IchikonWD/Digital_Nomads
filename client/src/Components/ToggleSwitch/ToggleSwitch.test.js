import React from "react";
import { shallow } from "enzyme";
import ToggleSwitch from "./ToggleSwitch";

describe("ToggleSwitch", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ToggleSwitch />);
    expect(wrapper).toMatchSnapshot();
  });
});
