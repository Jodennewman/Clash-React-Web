import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ButtonCollection } from "./ButtonCollection";

// Mock the AnimatedButton component
vi.mock("./AnimatedButton", () => ({
  AnimatedButton: ({ text, variant }: { text: string; variant: string }) => (
    <button data-testid={`button-${variant}`}>{text}</button>
  ),
}));

describe("ButtonCollection", () => {
  it("renders all four buttons", () => {
    render(<ButtonCollection />);

    expect(screen.getByTestId("button-start")).toBeInTheDocument();
    expect(screen.getByTestId("button-pro")).toBeInTheDocument();
    expect(screen.getByTestId("button-learn")).toBeInTheDocument();
    expect(screen.getByTestId("button-docs")).toBeInTheDocument();
  });

  it("renders with correct button texts", () => {
    render(<ButtonCollection />);

    expect(screen.getByText("START")).toBeInTheDocument();
    expect(screen.getByText("GO PRO")).toBeInTheDocument();
    expect(screen.getByText("LEARN")).toBeInTheDocument();
    expect(screen.getByText("DOCS")).toBeInTheDocument();
  });

  it("applies additional className when provided", () => {
    const { container } = render(<ButtonCollection className="test-class" />);
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass("test-class");
  });

  it("has the correct layout classes", () => {
    const { container } = render(<ButtonCollection />);
    const section = container.firstChild as HTMLElement;

    expect(section).toHaveClass("flex");
    expect(section).toHaveClass("flex-wrap");
    expect(section).toHaveClass("justify-center");
    expect(section).toHaveClass("gap-[24px]");
    expect(section).toHaveClass("max-w-[800px]");
    expect(section).toHaveClass("mx-auto");
    expect(section).toHaveClass("w-full");
  });
});
