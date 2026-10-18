import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { MoneyAmount } from "./money-amount";
import { NairaInput, useNairaInput, validateNairaText } from "./naira-input";

describe("MoneyAmount", () => {
  it("shows naira and keeps the exact kobo value machine-readable", () => {
    render(<MoneyAmount kobo={20_000_000} />);
    const el = screen.getByText("₦200,000");
    expect(el.tagName).toBe("DATA");
    expect(el).toHaveAttribute("value", "20000000");
  });
});

describe("validateNairaText", () => {
  it.each([
    ["", null, null],
    ["5000", 500_000, null],
    ["5,000", 500_000, null],
    ["₦1,500.50", 150_050, null],
    ["abc", null, "Enter an amount in naira, like 5,000."],
    ["0", 0, "Enter an amount greater than ₦0."],
  ])("%j -> kobo %j", (text, kobo, error) => {
    expect(validateNairaText(text)).toEqual({ text, kobo, error });
  });

  it("rejects amounts above the maximum with the exact limit", () => {
    expect(validateNairaText("300,000", 20_000_000).error).toBe(
      "The most you can enter is ₦200,000.",
    );
    expect(validateNairaText("200,000", 20_000_000).error).toBeNull();
  });
});

describe("useNairaInput", () => {
  it("tracks text, kobo and error together", () => {
    const { result } = renderHook(() => useNairaInput(1_000_000));
    act(() => result.current.setText("12,000"));
    expect(result.current.kobo).toBe(1_200_000);
    expect(result.current.error).toMatch(/most you can enter/);
  });
});

describe("NairaInput", () => {
  function Harness() {
    const [value, setValue] = useState("");
    return <NairaInput aria-label="Amount" value={value} onValueChange={setValue} />;
  }

  it("uses a decimal keyboard, not a number input", () => {
    render(<Harness />);
    const input = screen.getByRole("textbox", { name: "Amount" });
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "decimal");
  });

  it("accepts typed and pasted amounts with commas", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByRole("textbox", { name: "Amount" });
    await user.type(input, "1,500");
    expect(input).toHaveValue("1,500");
    await user.clear(input);
    await user.click(input);
    await user.paste("₦200,000.50");
    expect(input).toHaveValue("₦200,000.50");
  });
});
