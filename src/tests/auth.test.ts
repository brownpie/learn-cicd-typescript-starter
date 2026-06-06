import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns null if Authorization header is missing", () => {
    const headers = {};
    const key = getAPIKey(headers);
    expect(key).toBeNull();
  });

  test("returns null if Authorization header is empty or malformed", () => {
    const headers = { authorization: "" };
    const key = getAPIKey(headers);
    expect(key).toBeNull();
  });

  test("returns null if Authorization header does not start with ApiKey", () => {
    const headers = { authorization: "Bearer some-token" };
    const key = getAPIKey(headers);
    expect(key).toBeNull();
  });

  test("returns null if Authorization header is only 'ApiKey'", () => {
    const headers = { authorization: "ApiKey" };
    const key = getAPIKey(headers);
    expect(key).toBeNull("wrong-value"));
  });

  test("returns the API key when correct format is provided", () => {
    const headers = { authorization: "ApiKey my-secret-key-123" };
    const key = getAPIKey(headers);
    expect(key).toBe("my-secret-key-123");
  });
});
