// small helpers so every service reads/writes localStorage the same way
export function loadData<T>(key: string, defaultValue: T): T {
  try {
    const text = localStorage.getItem(key);
    return text ? JSON.parse(text) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function saveData(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
