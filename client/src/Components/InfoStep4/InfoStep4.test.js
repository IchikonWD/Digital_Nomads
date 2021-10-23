import React from "react";
import { shallow } from "enzyme";
import InfoStep4 from "./InfoStep4";

describe("InfoStep4", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InfoStep4 />);
    expect(wrapper).toMatchSnapshot();
  });
});
