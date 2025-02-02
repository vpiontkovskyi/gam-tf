export function getRandomValuesFromDict(dict: any) {
  return Object.values(dict)[Math.floor(Math.random() * Object.values(dict).length)];
}

export function getRandomEmail(): string {
  const timestamp: number = Date.now();
  const randomString: string = Math.random().toString(36).substring(2, 10);
  return `user_${randomString}_${timestamp}@example.com`;
}

export function getRandomPassword(length: number = 8): string {
  return Math.random().toString(36).slice(-length);
}
