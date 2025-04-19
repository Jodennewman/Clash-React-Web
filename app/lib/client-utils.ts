/**
 * Check if code is running in browser environment
 * @returns boolean indicating if window is defined
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Safe wrapper for browser-only code
 * @param callback Function to execute in browser environment
 * @param fallback Optional fallback value for server environment
 * @returns Result of callback in browser, fallback on server
 */
export function runOnClient<T>(callback: () => T, fallback?: T): T | undefined {
  if (isBrowser()) {
    return callback()
  }
  return fallback
}

/**
 * Safe access to window object
 * @returns window object or undefined
 */
export function getWindow(): Window | undefined {
  return isBrowser() ? window : undefined
}

/**
 * Safe access to document object
 * @returns document object or undefined
 */
export function getDocument(): Document | undefined {
  return isBrowser() ? document : undefined
}

/**
 * Safe access to localStorage
 * @returns localStorage object or undefined
 */
export function getLocalStorage(): Storage | undefined {
  return isBrowser() ? localStorage : undefined
}

/**
 * Safe access to sessionStorage
 * @returns sessionStorage object or undefined
 */
export function getSessionStorage(): Storage | undefined {
  return isBrowser() ? sessionStorage : undefined
}

/**
 * Safe localStorage.getItem with type conversion
 * @param key Storage key
 * @param parser Optional parser function (e.g., JSON.parse)
 * @returns Parsed value or null
 */
export function getStorageItem<T>(
  key: string,
  parser?: (value: string) => T
): T | string | null {
  const storage = getLocalStorage()
  if (!storage) return null
  
  const value = storage.getItem(key)
  if (!value) return null
  
  return parser ? parser(value) : value
}

/**
 * Safe localStorage.setItem with type conversion
 * @param key Storage key
 * @param value Value to store
 * @param serializer Optional serializer function (e.g., JSON.stringify)
 */
export function setStorageItem<T>(
  key: string,
  value: T,
  serializer?: (value: T) => string
): void {
  const storage = getLocalStorage()
  if (!storage) return
  
  const serialized = serializer ? serializer(value) : String(value)
  storage.setItem(key, serialized)
}

/**
 * Safe removal of localStorage item
 * @param key Storage key to remove
 */
export function removeStorageItem(key: string): void {
  const storage = getLocalStorage()
  if (storage) {
    storage.removeItem(key)
  }
}