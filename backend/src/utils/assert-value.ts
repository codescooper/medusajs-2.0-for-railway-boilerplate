/**
 * Assert that a value is set and non-empty. If it is undefined, empty or
 * whitespace-only, throw an error with the provided message.
 * @param v - Value to assert
 * @param errorMessage - Error message to throw if value is missing
 */
export function assertValue<T extends string | undefined>(
  v: T | undefined,
  errorMessage: string,
): T {
  if (v === undefined || v.trim() === '') {
    throw new Error(errorMessage)
  }

  return v
}
