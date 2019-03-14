import React from "react";
import PageAbout from "../index";
import renderer from "react-test-renderer";

it("PageAbout renders correctly", () => {
  const tree = renderer.create(<PageAbout />).toJSON();
  expect(tree).toMatchSnapshot();
});
