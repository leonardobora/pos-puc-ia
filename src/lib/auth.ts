import { createHmac, timingSafeEqual } from "crypto";

export const AUTH_COOKIE_NAME = "postgrad_session";

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET ?? "postgrad-change-this-secret";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin",
  };
}

export function createSessionToken(username: string) {
  const issuedAt = Date.now().toString();
  const payload = `${username}.${issuedAt}`;
  const signature = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [username, issuedAt, signature] = parts;
  const payload = `${username}.${issuedAt}`;
  const expected = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");

  const left = Buffer.from(signature);
  const right = Buffer.from(expected);

  if (left.length !== right.length) return false;

  const isValidSignature = timingSafeEqual(left, right);
  if (!isValidSignature) return false;

  const maxAgeMs = 1000 * 60 * 60 * 24 * 7;
  const age = Date.now() - Number(issuedAt);
  if (Number.isNaN(age) || age < 0 || age > maxAgeMs) return false;

  return true;
}

export function parseCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return undefined;

  const target = `${name}=`;
  const cookiePart = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(target));

  if (!cookiePart) return undefined;
  return decodeURIComponent(cookiePart.slice(target.length));
}

export function isAuthenticatedRequest(request: Request) {
  const token = parseCookie(request.headers.get("cookie"), AUTH_COOKIE_NAME);
  return verifySessionToken(token);
}
