import { ReactNode } from "react"
import { StateSchema } from "../config/StateSchema"
import { createReduxStore } from "../config/store"
import { Provider } from "react-redux"

interface StoreProviderProps {
  initialState?: StateSchema
  children: ReactNode
}

export const StoreProvider = ({ initialState, children }: StoreProviderProps) => {
  const store = createReduxStore(initialState)

  return <Provider store={store}>{children}</Provider>
}
