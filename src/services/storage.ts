export async function clearData(): Promise<void> {
  localStorage.clear();
  return Promise.resolve();
}

export async function getData<T = unknown>(key: string): Promise<T | null> {
  const jsonData = localStorage.getItem(key);

  if (!jsonData) return null;

  try {
    const parsedData: T = JSON.parse(jsonData);

    return Promise.resolve(parsedData);
  } catch (error) {
    return Promise.resolve(null);
  }
}

export async function removeData(key: string): Promise<void> {
  localStorage.removeItem(key);
  return Promise.resolve();
}

export async function saveData(key: string, data: unknown): Promise<void> {
  const stringfiedData = JSON.stringify(data);

  localStorage.setItem(key, stringfiedData);

  return Promise.resolve();
}
