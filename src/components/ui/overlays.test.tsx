import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./dialog";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./sheet";

describe("Dialog", () => {
  it("opens, moves focus inside, and closes on Escape returning focus", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Close campaign</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Close this campaign?</DialogTitle>
          <DialogDescription>Funds raised are still used for the stated purpose.</DialogDescription>
          <Button>Close campaign now</Button>
        </DialogContent>
      </Dialog>,
    );
    const trigger = screen.getByRole("button", { name: "Close campaign" });
    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Close this campaign?" });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});

describe("Sheet", () => {
  it("opens as a labelled dialog with a close button", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Donate</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetTitle>Give to this campaign</SheetTitle>
          <SheetDescription>Choose an amount.</SheetDescription>
        </SheetContent>
      </Sheet>,
    );
    await user.click(screen.getByRole("button", { name: "Donate" }));
    const sheet = await screen.findByRole("dialog", { name: "Give to this campaign" });
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(sheet).not.toBeInTheDocument());
  });
});
