import React from "react";
import Character from "../../../container/character_show";
import { Provider } from "react-redux";
import Store from "../../../store";
import { render, screen } from "@testing-library/react";

describe("running Character without complete character data", () => {
  test("character data that is completely null", async () => {
    let location = { pathname: "/characters/10001" };
    render(
      <Provider store={Store}>
        <Character location={location} />
      </Provider>
    );

    const characterName = await screen.findByText("Jeffery");
    expect(characterName).toBeInTheDocument();
  });
});
