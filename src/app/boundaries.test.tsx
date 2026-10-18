import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RouteError from "./error";
import NotFound from "./not-found";

describe("error and not-found boundaries (F1.5)", () => {
  it("not-found explains and links home", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { name: "We couldn't find that page" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to the home page" })).toHaveAttribute("href", "/");
  });

  it("route error never shows raw error details and offers a retry", async () => {
    const user = userEvent.setup();
    const retry = vi.fn();
    render(<RouteError error={new Error("DB password is hunter2")} retry={retry} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(screen.queryByText(/hunter2/)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
