import * as process from "node:process";

export function getRandomEmail(): string {
  const timestamp: number = Date.now();
  const randomString: string = Math.random().toString(36).substring(2, 10);
  return `user_${randomString}_${timestamp}@${process.env.TEST_MAIL_DOMAIN || "example.net"}`;
}

export function getRandomPassword(length: number = 8): string {
  return Math.random().toString(36).slice(-length);
}
