import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InputDesign from "./InputDesign";

describe("InputDesign", () => {
  it("renders the close button", () => {
    render(<InputDesign />);
    const button = screen.getByRole("button", { name: /clear input/i });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("×");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<InputDesign onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /clear input/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<InputDesign className="custom-class" />);
    const button = screen.getByRole("button", { name: /clear input/i });
    expect(button.classList.contains("custom-class")).toBe(true);
  });

  it("applies custom aria-label", () => {
    render(<InputDesign ariaLabel="Custom label" />);
    const button = screen.getByRole("button", { name: /custom label/i });
    expect(button).toBeInTheDocument();
  });
});
