import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRippleEffect } from "./useRippleEffect";

describe("useRippleEffect", () => {
  let appendChildMock: any;
  let removeElementMock: any;
  let mockButton: any;
  let mockEvent: any;

  beforeEach(() => {
    // Mock DOM elements and methods
    mockButton = {
      getBoundingClientRect: () => ({ left: 10, top: 20 }),
      appendChild: vi.fn(),
      getElementsByClassName: vi.fn().mockReturnValue([]),
    };

    mockEvent = {
      currentTarget: mockButton,
      clientX: 50,
      clientY: 70,
    };

    // Mock document.createElement
    global.document.createElement = vi.fn().mockImplementation((tag) => {
      if (tag === "div") {
        return {
          style: {
            left: "",
            top: "",
            background: "",
          },
          className: "",
          remove: vi.fn(),
        };
      }
      return {} as any;
    });

    // Mock setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("creates a ripple effect with default options", () => {
    const { result } = renderHook(() => useRippleEffect());
    const createRipple = result.current;

    createRipple(mockEvent);

    expect(document.createElement).toHaveBeenCalledWith("div");
    expect(mockButton.appendChild).toHaveBeenCalled();

    const rippleElement = (document.createElement as any).mock.results[0].value;
    expect(rippleElement.style.left).toBe("40px"); // 50 - 10
    expect(rippleElement.style.top).toBe("50px"); // 70 - 20
    expect(rippleElement.style.background).toBe("rgba(255, 255, 255, 0.7)");
    expect(rippleElement.className).toBe(
      "absolute w-[1px] h-[1px] rounded-full animate-ripple",
    );

    // Test that setTimeout was called to remove the ripple
    vi.runAllTimers();
    expect(rippleElement.remove).toHaveBeenCalled();
  });

  it("creates a ripple effect with custom options", () => {
    const { result } = renderHook(() =>
      useRippleEffect({ color: "rgba(0, 0, 255, 0.5)", duration: 800 }),
    );
    const createRipple = result.current;

    createRipple(mockEvent);

    const rippleElement = (document.createElement as any).mock.results[0].value;
    expect(rippleElement.style.background).toBe("rgba(0, 0, 255, 0.5)");

    // Test that setTimeout was called with the custom duration
    vi.advanceTimersByTime(500);
    expect(rippleElement.remove).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(rippleElement.remove).toHaveBeenCalled();
  });

  it("removes existing ripples before creating a new one", () => {
    const existingRipple = { remove: vi.fn() };
    mockButton.getElementsByClassName.mockReturnValue([
      existingRipple,
      existingRipple,
    ]);

    const { result } = renderHook(() => useRippleEffect());
    const createRipple = result.current;

    createRipple(mockEvent);

    expect(existingRipple.remove).toHaveBeenCalledTimes(2);
  });
});
