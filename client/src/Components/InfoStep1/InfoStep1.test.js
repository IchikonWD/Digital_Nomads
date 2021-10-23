import React from "react";
import { shallow } from "enzyme";
import InfoStep1 from "./InfoStep1";

describe("InfoStep1", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InfoStep1 />);
    expect(wrapper).toMatchSnapshot();
  });
});
