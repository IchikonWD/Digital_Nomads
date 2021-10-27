import React from "react";
import { shallow } from "enzyme";
import LoginGoogle from "./LoginGoogleComp";

describe("LoginGoogle", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LoginGoogle />);
    expect(wrapper).toMatchSnapshot();
  });
});
