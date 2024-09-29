import { StateSchema } from "@/app/providers/StoreProvider"

export const getSkip = (state: StateSchema) => {
  const inited = state.requestFilter._inited
  const startDate = state.requestFilter.filter.startDate
  const endDate = state.requestFilter.filter.endDate

  return inited && !!startDate && !endDate
}
