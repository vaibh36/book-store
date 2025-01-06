import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavButton from "../components/NavButton";

describe("NavButton", () => {
  test("renders button with correct text and props", () => {
    render(
      <MemoryRouter>
        <NavButton to="/test" variant="contained" color="primary">
          Click Me
        </NavButton>
      </MemoryRouter>
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("Click Me");
  });
});
