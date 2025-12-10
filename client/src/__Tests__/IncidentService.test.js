import { describe, it, expect } from "vitest";
import { mapIncident } from "../services/IncidentService";

describe("mapIncident", () => {
  it("maps raw incident from API into app format", () => {
    const raw = {
      _id: "123",
      title: "Server down",
      status: "Open",
      priority: "High",
      assignedTo: "Juan",
      extraField: "ignored",
    };

    const result = mapIncident(raw);

    expect(result).toEqual({
      id: "123",
      title: "Server down",
      status: "Open",
      priority: "High",
      assignedTo: "Juan",
    });
  });

  it("handles missing optional fields safely", () => {
    const raw = {
      _id: "456",
      title: "Login issue",
    };

    const result = mapIncident(raw);

    expect(result.id).toBe("456");
    expect(result.title).toBe("Login issue");
    // These might be undefined, which is okay
    expect(result.status).toBeUndefined();
    expect(result.priority).toBeUndefined();
    expect(result.assignedTo).toBeUndefined();
  });
});
