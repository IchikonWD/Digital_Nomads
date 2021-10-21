import React from "react";
import { shallow } from "enzyme";
import BurguerMenu from "./BurguerMenu";

describe("BurguerMenu", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<BurguerMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
