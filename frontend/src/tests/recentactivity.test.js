import { screen, render } from "@testing-library/react";
import Activity from "../components/recentactivities/RecentActivities";

it("test Recent Activity page", () => {
  console.error = jest.fn();
  render(<Activity />);
  const activity = screen.getByText(/Recent activity/);
  const groupDropdown = screen.getByText(/Select a group.../);
  const sortbyDropDown = screen.getByText(/Sort By Date/);
  expect(groupDropdown).toBeInTheDocument();
  expect(sortbyDropDown).toBeInTheDocument();
  expect(activity).toBeInTheDocument();
});
