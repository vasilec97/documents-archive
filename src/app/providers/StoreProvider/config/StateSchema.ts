import { RecordFilterSchema } from "@/features/filterRecord"
import { RequestFilterSchema } from "@/features/filterRequest"
import { rtkApi } from "@/shared/api/rtkApi"

export interface StateSchema {
  requestFilter: RequestFilterSchema
  recordFilter: RecordFilterSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export interface ThunkConfig<T> {
  rejectValue: T
  state: StateSchema
}
