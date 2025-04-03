import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import AnimatedButtonsDemo from "./AnimatedButtonsDemo";

// Mock the ButtonCollection component
vi.mock("./ButtonCollection", () => ({
  ButtonCollection: () => (
    <div data-testid="button-collection">Button Collection</div>
  ),
}));

describe("AnimatedButtonsDemo", () => {
  it("renders the ButtonCollection component", () => {
    const { getByTestId } = render(<AnimatedButtonsDemo />);
    expect(getByTestId("button-collection")).toBeInTheDocument();
  });

  it("has the correct background and font styles", () => {
    const { container } = render(<AnimatedButtonsDemo />);
    const main = container.firstChild as HTMLElement;

    expect(main).toHaveClass("bg-[#FFF5EE]");
    expect(main).toHaveClass("font-['Neue_Haas_Grotesk_Display_Pro']");
  });

  it("has the correct layout styles", () => {
    const { container } = render(<AnimatedButtonsDemo />);
    const main = container.firstChild as HTMLElement;

    expect(main).toHaveClass("flex");
    expect(main).toHaveClass("flex-col");
    expect(main).toHaveClass("items-center");
    expect(main).toHaveClass("justify-center");
    expect(main).toHaveClass("min-h-screen");
    expect(main).toHaveClass("w-screen");
    expect(main).toHaveClass("p-[32px]");
  });
});
