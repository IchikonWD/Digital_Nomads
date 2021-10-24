import React from "react";
import { shallow } from "enzyme";
import FilterSteps from "./FilterSteps";

describe("FilterSteps", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FilterSteps />);
    expect(wrapper).toMatchSnapshot();
  });
});
