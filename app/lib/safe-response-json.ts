/**
 * Parse JSON from a fetch Response without throwing on empty or non-JSON bodies.
 */
export async function readJsonOrNull<T>(res: Response): Promise<T | null> {
  const raw = await res.text();
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    return null;
  }
}
