import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InputWithClearButton from "./InputWithClearButton";

describe("InputWithClearButton", () => {
  it("renders the input with placeholder", () => {
    render(<InputWithClearButton placeholder="Search..." />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("updates value when typing", () => {
    render(<InputWithClearButton />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test value" } });
    expect(input).toHaveValue("test value");
  });

  it("shows clear button only when input has value", () => {
    render(<InputWithClearButton />);
    const input = screen.getByRole("textbox");

    // Clear button should not be visible initially
    expect(
      screen.queryByRole("button", { name: /clear input/i }),
    ).not.toBeInTheDocument();

    // Type something
    fireEvent.change(input, { target: { value: "test value" } });

    // Clear button should now be visible
    expect(
      screen.getByRole("button", { name: /clear input/i }),
    ).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    render(<InputWithClearButton />);
    const input = screen.getByRole("textbox");

    // Type something
    fireEvent.change(input, { target: { value: "test value" } });
    expect(input).toHaveValue("test value");

    // Click clear button
    const clearButton = screen.getByRole("button", { name: /clear input/i });
    fireEvent.click(clearButton);

    // Input should be empty
    expect(input).toHaveValue("");

    // Clear button should be hidden again
    expect(
      screen.queryByRole("button", { name: /clear input/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onChange handler with updated value", () => {
    const handleChange = vi.fn();
    render(<InputWithClearButton onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    // Type something
    fireEvent.change(input, { target: { value: "test value" } });

    // onChange should be called with the new value
    expect(handleChange).toHaveBeenCalledWith("test value");

    // Click clear button
    const clearButton = screen.getByRole("button", { name: /clear input/i });
    fireEvent.click(clearButton);

    // onChange should be called with empty string
    expect(handleChange).toHaveBeenCalledWith("");
  });
});
