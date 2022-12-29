import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/勝敗と倍率/i);
  expect(linkElement).toBeInTheDocument();
});
