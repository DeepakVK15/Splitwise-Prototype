import { screen, render } from "@testing-library/react";
import Landing from "../components/landing/landing";

it("test landing page", () => {
  console.error = jest.fn();
  render(<Landing />);
  const loginButton = screen.getByText(/Log in/);
  const signupButton = screen.getByText(/Sign up/);
  const image = screen.getByAltText("landing");
  expect(loginButton).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});
