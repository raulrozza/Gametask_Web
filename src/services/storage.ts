async function clear(): Promise<void> {
  localStorage.clear();
  return Promise.resolve();
}

async function get<T = unknown>(key: string): Promise<T | null> {
  const jsonData = localStorage.getItem(key);

  if (!jsonData) return null;

  try {
    const parsedData: T = JSON.parse(jsonData);

    return Promise.resolve(parsedData);
  } catch (error) {
    return Promise.resolve(null);
  }
}

async function remove(key: string): Promise<void> {
  localStorage.removeItem(key);
  return Promise.resolve();
}

async function save(key: string, data: unknown): Promise<void> {
  const stringfiedData = JSON.stringify(data);

  localStorage.setItem(key, stringfiedData);

  return Promise.resolve();
}

export default {
  clear,
  get,
  remove,
  save,
};
