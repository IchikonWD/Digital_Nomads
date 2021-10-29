import React from "react";
import { shallow } from "enzyme";
import Prechat from "./Prechat";

describe("Prechat", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Prechat />);
    expect(wrapper).toMatchSnapshot();
  });
});
