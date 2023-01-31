import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("should render the correct information", () => {
    const { getByText } = render(<Footer />);
    const name = getByText("Alejandro Becagigi, BECAALE®, 2023");
    expect(name).toBeInTheDocument();
  });
});
