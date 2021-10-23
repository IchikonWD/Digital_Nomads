import React from "react";
import { shallow } from "enzyme";
import InfoStep2 from "./InfoStep2";

describe("InfoStep2", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InfoStep2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
