import React from "react";
import { shallow } from "enzyme";
import InfoSteps from "./InfoSteps";

describe("InfoSteps", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InfoSteps />);
    expect(wrapper).toMatchSnapshot();
  });
});
