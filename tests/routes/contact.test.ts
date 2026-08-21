/**
 * @jest-environment node
 */
import type { NextRequest } from "next/server";

const mockSend = jest.fn();

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend }
  }))
}));

import { POST } from "@/app/api/contact/route";
import { resetRateLimits } from "@/lib/rateLimit";

function makeRequest(body: unknown, ip = "203.0.113.10"): NextRequest {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip
    },
    body: JSON.stringify(body)
  }) as unknown as NextRequest;
}

describe("contact API route", () => {
  beforeEach(() => {
    resetRateLimits();
    mockSend.mockReset();
    process.env.CONTACT_TO_EMAIL = "to@example.com";
    process.env.RESEND_API_KEY = "test-key";
  });

  it("sends a valid submission", async () => {
    mockSend.mockResolvedValue({ data: { id: "email-1" }, error: null });

    const response = await POST(makeRequest({ name: "Will", email: "will@example.com", message: "Hello" }));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend.mock.calls[0][0].replyTo).toBe("will@example.com");
  });

  it("rejects malformed email addresses", async () => {
    const response = await POST(makeRequest({ name: "Will", email: "not-an-email", message: "Hello" }));

    expect(response.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects oversized names", async () => {
    const response = await POST(
      makeRequest({ name: "a".repeat(101), email: "will@example.com", message: "Hello" })
    );

    expect(response.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("accepts honeypot submissions silently without sending", async () => {
    const response = await POST(
      makeRequest({ name: "Bot", email: "bot@example.com", message: "Spam", website: "http://spam.example" })
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions from one IP", async () => {
    mockSend.mockResolvedValue({ data: { id: "email" }, error: null });

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(
        makeRequest({ name: "Will", email: "will@example.com", message: "Hello" }, "198.51.100.7")
      );
      expect(response.status).toBe(200);
    }

    const blocked = await POST(
      makeRequest({ name: "Will", email: "will@example.com", message: "Hello" }, "198.51.100.7")
    );
    expect(blocked.status).toBe(429);
    expect(mockSend).toHaveBeenCalledTimes(5);
  });
});
