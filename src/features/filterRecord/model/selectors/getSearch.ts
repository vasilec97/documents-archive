import { StateSchema } from "@/app/providers/StoreProvider"

export const getSearch = (state: StateSchema) => state.recordFilter.filter.search
