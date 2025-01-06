import { theme } from "../theme";

describe("theme", () => {
  test("should have the correct primary and secondary colors", () => {
    expect(theme.palette.primary.main).toBe("#1976d2");
    expect(theme.palette.secondary.main).toBe("#dc004e");
  });
});
