import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AnimatedButton } from "./AnimatedButton";

// Mock the useRippleEffect hook
vi.mock("./useRippleEffect", () => ({
  useRippleEffect: () => vi.fn(),
}));

describe("AnimatedButton", () => {
  it("renders with correct text", () => {
    render(<AnimatedButton text="TEST" variant="start" />);
    expect(screen.getByText("TEST")).toBeInTheDocument();
  });

  it("applies correct styles for start variant", () => {
    const { container } = render(
      <AnimatedButton text="START" variant="start" />,
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("shadow-[0_4px_12px_rgba(222,107,89,0.25)]");
  });

  it("applies correct styles for pro variant", () => {
    const { container } = render(
      <AnimatedButton text="GO PRO" variant="pro" />,
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("shadow-[0_4px_12px_rgba(254,163,93,0.25)]");
  });

  it("applies correct styles for learn variant", () => {
    const { container } = render(
      <AnimatedButton text="LEARN" variant="learn" />,
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("shadow-[0_4px_12px_rgba(95,148,159,0.25)]");
  });

  it("applies correct styles for docs variant", () => {
    const { container } = render(<AnimatedButton text="DOCS" variant="docs" />);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("shadow-[0_4px_12px_rgba(18,46,59,0.1)]");
    expect(button).toHaveClass("border-[2px]");
    expect(button).toHaveClass("border-[#122E3B]");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(
      <AnimatedButton text="TEST" variant="start" onClick={handleClick} />,
    );
    fireEvent.click(screen.getByText("TEST"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies additional className when provided", () => {
    const { container } = render(
      <AnimatedButton text="TEST" variant="start" className="test-class" />,
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("test-class");
  });

  it("includes hover and focus state classes", () => {
    const { container } = render(
      <AnimatedButton text="TEST" variant="start" />,
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("hover:scale-[1.03]");
    expect(button).toHaveClass("focus:scale-[1.02]");
    expect(button).toHaveClass("focus:outline-none");
    expect(button).toHaveClass("focus:ring-2");
  });

  it("applies different focus ring colors based on variant", () => {
    const { rerender, container } = render(
      <AnimatedButton text="TEST" variant="start" />,
    );
    let button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("focus:ring-white");

    rerender(<AnimatedButton text="TEST" variant="docs" />);
    button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("focus:ring-[#122E3B]");
  });
});
