export function updateItemAtIndex<T extends object>(
  array: T[],
  index: number,
  updates: Partial<T>,
): T[] {
  // Check if index is valid
  if (index < 0 || index >= array.length) {
    throw new Error("Index out of bounds");
  }

  // Create a new array with the merged object at the specified index
  return array.map((item, i) => (i === index ? { ...item, ...updates } : item));
}
