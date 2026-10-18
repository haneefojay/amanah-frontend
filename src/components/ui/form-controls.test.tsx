import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "@/test/axe";
import { Checkbox } from "./checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";

describe("Input and Field", () => {
  it("links label, hint and error to the input", async () => {
    const { container } = render(
      <Field data-invalid>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" aria-invalid aria-describedby="email-hint email-error" />
        <FieldDescription id="email-hint">We send your receipt here.</FieldDescription>
        <FieldError id="email-error">Enter a valid email address.</FieldError>
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAccessibleDescription(
      "We send your receipt here. Enter a valid email address.",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    await expectNoA11yViolations(container);
  });

  it("uses 16px text so phones do not zoom in on focus", () => {
    render(<Input aria-label="Name" />);
    const cls = screen.getByRole("textbox", { name: "Name" }).className;
    expect(cls).toContain("text-base");
    expect(cls).not.toContain("md:text-sm");
  });

  it("accepts typing in a textarea", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Update" />);
    await user.type(screen.getByRole("textbox", { name: "Update" }), "Rice delivered");
    expect(screen.getByRole("textbox", { name: "Update" })).toHaveValue("Rice delivered");
  });
});

describe("Select", () => {
  it("opens with the keyboard and picks an option", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="city">City</Label>
        <Select>
          <SelectTrigger id="city" aria-label="City">
            <SelectValue placeholder="Choose a city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="offa">Offa</SelectItem>
            <SelectItem value="ilorin">Ilorin</SelectItem>
          </SelectContent>
        </Select>
      </>,
    );
    const trigger = screen.getByRole("combobox", { name: "City" });
    trigger.focus();
    await user.keyboard("{Enter}");
    await user.click(await screen.findByRole("option", { name: "Ilorin" }));
    expect(trigger).toHaveTextContent("Ilorin");
  });
});

describe("Checkbox and Switch", () => {
  it("toggle and expose their state", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <>
        <div className="flex gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">I agree</Label>
        </div>
        <div className="flex gap-2">
          <Switch id="anon" />
          <Label htmlFor="anon">Give anonymously</Label>
        </div>
      </>,
    );
    const checkbox = screen.getByRole("checkbox", { name: "I agree" });
    const toggle = screen.getByRole("switch", { name: "Give anonymously" });
    await user.click(checkbox);
    await user.click(toggle);
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(toggle).toHaveAttribute("aria-checked", "true");
    await expectNoA11yViolations(container);
  });
});
