import React from "react";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";
import { BrowserRouter } from "react-router-dom";

describe("Landing component", () => {
  test("renders video and section", () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    expect(screen.getByText("All breeds")).toBeInTheDocument();
    expect(screen.getByText("professional info for")).toBeInTheDocument();
    expect(screen.getByText("daycare, grooming & training")).toBeInTheDocument();
    expect(screen.getByText("join now")).toBeInTheDocument();
  });
});
