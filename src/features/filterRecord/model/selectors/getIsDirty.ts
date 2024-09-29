import { StateSchema } from "@/app/providers/StoreProvider"

export const getIsDirty = (state: StateSchema) => state.recordFilter.isDirty
