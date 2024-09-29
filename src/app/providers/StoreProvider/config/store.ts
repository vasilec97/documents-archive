import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { StateSchema } from "./StateSchema"
import { rtkApi } from "@/shared/api/rtkApi"
import { requestFilterReducer } from "@/features/filterRequest"
import { recordFilterReducer } from "@/features/filterRecord"

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    requestFilter: requestFilterReducer,
    recordFilter: recordFilterReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  }

  const store = configureStore({
    reducer: rootReducers,
    devTools: true,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(rtkApi.middleware),
  })

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]
