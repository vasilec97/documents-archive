import { StateSchema } from "@/app/providers/StoreProvider"

export const getSkip = (state: StateSchema) => {
  const inited = state.recordFilter._inited
  const startDate = state.recordFilter.filter.startDate
  const endDate = state.recordFilter.filter.endDate

  return inited && !!startDate && !endDate
}
