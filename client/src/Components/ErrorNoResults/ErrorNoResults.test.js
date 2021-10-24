import React from "react";
import { shallow } from "enzyme";
import ErrorNoResults from "./ErrorNoResults";

describe("ErrorNoResults", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ErrorNoResults />);
    expect(wrapper).toMatchSnapshot();
  });
});
