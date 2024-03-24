import { it, expect, describe } from "vitest";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { add, diff } from "../utils/math.js";
import { toCelsius } from "../utils/converter.js";

import App from "../src/App.jsx";

describe("UI test", () => {
    it("should render correctly", async () => {
        render(<App />);

        expect(screen.getByRole("title")).toBeInTheDocument();
    });

    it("should show correct result", async () => {
        render(<App />);

        await fireEvent.change(screen.getByRole("input"), {
            target: { value: 100 }
        });

        await fireEvent.click(screen.getByRole("button"));

        expect(screen.queryByText("37.78")).toBeInTheDocument();
    });
});

describe("math module", () => {
    it("should be 3", () => {
		expect(add(1, 2)).toBe(3);
	});

	it("should be 1", () => {
		expect(diff(1, 2)).toBe(1);
	});
});

describe("converter module", () => {
    it("should be correct value", () => {
        expect(toCelsius(32)).toBe(0.00);
        expect(toCelsius(100)).toBe(37.78);
    });
});
