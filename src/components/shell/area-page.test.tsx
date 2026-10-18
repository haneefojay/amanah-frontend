import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AreaPage, areaStaticParams } from "./area-page";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

describe("AreaPage", () => {
  it("renders the nav item's page title", async () => {
    render(
      await AreaPage({ role: "PLATFORM_ADMIN", params: Promise.resolve({ slug: ["audit"] }) }),
    );
    expect(screen.getByRole("heading", { level: 1, name: "Audit log" })).toBeInTheDocument();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });

  it("renders the area home without a slug", async () => {
    render(await AreaPage({ role: "WITNESS", params: Promise.resolve({}) }));
    expect(screen.getByRole("heading", { level: 1, name: "Assigned" })).toBeInTheDocument();
  });

  it("404s for paths outside the area's navigation", async () => {
    await expect(
      AreaPage({ role: "ORG_ADMIN", params: Promise.resolve({ slug: ["nope"] }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("lists every section of an area for static generation", () => {
    expect(areaStaticParams("ORG_ADMIN")).toEqual([
      { slug: [] },
      { slug: ["campaigns"] },
      { slug: ["profile"] },
    ]);
  });
});
