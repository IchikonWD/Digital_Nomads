import React from "react";
import { shallow } from "enzyme";
import RegisterStep2 from "./RegisterStep2";

describe("RegisterStep2", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RegisterStep2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
