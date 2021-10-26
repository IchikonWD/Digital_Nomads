import React from "react";
import { shallow } from "enzyme";
import RatingModal from "./RatingModal";

describe("RatingModal", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RatingModal />);
    expect(wrapper).toMatchSnapshot();
  });
});
