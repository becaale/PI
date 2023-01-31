import React from "react";
import { render, screen } from "@testing-library/react";
import Breed from "./Breed";
import { BrowserRouter } from "react-router-dom";

describe("Breed component", () => {
  test("renders breed information", () => {
    render(
      <BrowserRouter>
        <Breed
          id="1"
          name="Labrador Retriever"
          weight="25"
          temperament="Friendly"
          image="https://example.com/labrador.jpeg"
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Labrador Retriever")).toBeInTheDocument();
    expect(screen.getByText("25 Kg")).toBeInTheDocument();
    expect(screen.getByText("Friendly")).toBeInTheDocument();
    expect(screen.getByAltText("img of Labrador Retriever")).toBeInTheDocument();
  });
});
