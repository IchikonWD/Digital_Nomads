import React from "react";
import { shallow } from "enzyme";
import LoginGoogleComp from "./LoginGoogleComp";

describe("LoginGoogleComp", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LoginGoogleComp />);
    expect(wrapper).toMatchSnapshot();
  });
});
