import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_KEY_LEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(password, salt, SCRYPT_KEY_LEN).toString("hex");
  return `${salt}:${key}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expectedKey] = storedHash.split(":");
  if (!salt || !expectedKey) return false;
  const actualKey = scryptSync(password, salt, SCRYPT_KEY_LEN).toString("hex");
  const expectedBuffer = Buffer.from(expectedKey, "hex");
  const actualBuffer = Buffer.from(actualKey, "hex");
  if (expectedBuffer.length !== actualBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, actualBuffer);
}
