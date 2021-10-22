import React from "react";
import { shallow } from "enzyme";
import ScrollButton from "./ScrollButton";

describe("ScrollButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ScrollButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
