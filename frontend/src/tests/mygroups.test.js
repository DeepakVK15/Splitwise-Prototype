import { screen, render } from "@testing-library/react";
import MyGroups from "../components/groups/MyGroups";

it("test MyGroups page", () => {
  console.error = jest.fn();
  render(<MyGroups />);
  const mygroups = screen.getByText(/My Groups/);
  const invites = screen.getByText(/Invites/);
  expect(mygroups).toBeInTheDocument();
  expect(invites).toBeInTheDocument();
});
