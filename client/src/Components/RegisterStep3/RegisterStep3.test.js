import React from "react";
import { shallow } from "enzyme";
import RegisterStep3 from "./RegisterStep3";

describe("RegisterStep3", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RegisterStep3 />);
    expect(wrapper).toMatchSnapshot();
  });
});
