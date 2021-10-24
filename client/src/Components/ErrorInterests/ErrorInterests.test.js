import React from "react";
import { shallow } from "enzyme";
import ErrorInterests from "./ErrorInterests";

describe("ErrorInterests", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ErrorInterests />);
    expect(wrapper).toMatchSnapshot();
  });
});
