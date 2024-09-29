/// <reference types="vite/client" />
type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
