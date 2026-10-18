import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "@/test/axe";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { Skeleton } from "./skeleton";
import { Toaster } from "./sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

describe("Tabs", () => {
  it("switches panels with arrow keys", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="items">Item list</TabsContent>
        <TabsContent value="expenses">Expense list</TabsContent>
      </Tabs>,
    );
    screen.getByRole("tab", { name: "Items" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Expenses" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Expense list");
    await expectNoA11yViolations(container);
  });
});

describe("EmptyState and ErrorState", () => {
  it("empty state invites the next action", () => {
    render(
      <EmptyState
        title="No campaigns yet"
        description="Create your first campaign to start receiving donations."
        action={<button type="button">Create campaign</button>}
      />,
    );
    expect(screen.getByText("No campaigns yet")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create campaign" })).toBeInTheDocument();
  });

  it("error state is announced and offers a retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});

describe("Skeleton, Card and Toast", () => {
  it("skeleton is decorative", () => {
    const { container } = render(<Skeleton className="h-4 w-20" aria-hidden="true" />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("card renders its title and content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Spent</CardTitle>
        </CardHeader>
        <CardContent>₦420,000</CardContent>
      </Card>,
    );
    expect(screen.getByText("Spent")).toBeInTheDocument();
    expect(screen.getByText("₦420,000")).toBeInTheDocument();
  });

  it("toasts appear in the Toaster", async () => {
    render(<Toaster />);
    act(() => {
      toast.success("Expense logged");
    });
    expect(await screen.findByText("Expense logged")).toBeInTheDocument();
  });
});
