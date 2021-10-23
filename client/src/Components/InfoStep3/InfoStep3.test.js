import React from "react";
import { shallow } from "enzyme";
import InfoStep3 from "./InfoStep3";

describe("InfoStep3", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InfoStep3 />);
    expect(wrapper).toMatchSnapshot();
  });
});
