import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import PageHome from "../index";
import store from "@redux/store";
import renderer from "react-test-renderer";

it("PageHome renders correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/", { pathname: "/" }]}>
          <PageHome />
        </MemoryRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
