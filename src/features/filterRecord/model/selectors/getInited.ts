import { StateSchema } from "@/app/providers/StoreProvider"

export const getInited = (state: StateSchema) => state.recordFilter._inited
