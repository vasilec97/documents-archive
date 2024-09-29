import { StateSchema } from "@/app/providers/StoreProvider"
import { createSelector } from "@reduxjs/toolkit"

export const getFilter = createSelector(
  [(state: StateSchema) => state.recordFilter],
  (recordFilter) => recordFilter.filter
)
