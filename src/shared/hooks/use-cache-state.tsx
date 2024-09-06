import { useEffect, useState } from "react"

// eslint-disable-next-line comma-spacing
const getFromLocalStorage = <T,>(key: string): T => {
  // if (typeof T === "boolean") {
  //   return localStorage.getItem(key) === "true" as T
  // }

  return localStorage.getItem(key) as T
}

// eslint-disable-next-line comma-spacing
export const useCacheState = <T,>(key: string, initialState: T): [T, (value: T) => void] => {
  const [cachedValue, setCachedValue] = useState<T>(getFromLocalStorage(key) ?? initialState)

  const update = (value: T) => {
    // TODO add save for object and primitive
    setCachedValue(value)
    localStorage.setItem(key, String(value))
  }

  useEffect(() => {
    const valueFromLocalStorage = getFromLocalStorage<T>(key)
    setCachedValue(valueFromLocalStorage ?? initialState)
  }, [])

  return [cachedValue, update]
}
