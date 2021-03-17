import { screen, render, fireEvent } from "@testing-library/react";
import CreateGroup from "../components/groups/CreateGroup";

it("test CreateGroup page", () => {
  console.error = jest.fn();
  render(<CreateGroup />);
  const image = screen.getByAltText("createGrp");
  const groupname = screen.getByTestId("groupname");
  const saveButton = screen.getByText(/Save/);
  fireEvent.change(groupname, { target: { value: "Walmart" } });
  expect(image).toBeInTheDocument();
  expect(groupname.value).toBe("Walmart");
  expect(saveButton).toBeInTheDocument();
});
