import React from "react";
import { shallow } from "enzyme";
import Explore2 from "./Explore2";

describe("Explore2", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Explore2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
