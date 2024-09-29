import { getRequestsByFilterFulfilledMatcher } from "@/entities/Request"
import { RequestFilter, RequestFilterSchema } from "../../types/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: RequestFilterSchema = {
  filter: {
    search: "",
    startDate: undefined,
    endDate: undefined,
    quickNavigation: undefined,
    requestStatus: undefined,
  },
  isDirty: false,
  _inited: false,
}

export const archiveFilterSlice = createSlice({
  name: "requestFilter",
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Partial<RequestFilter>>) => {
      state.filter = { ...state.filter, ...payload }

      if (!state.isDirty) state.isDirty = true
    },
    clearFilter: (state) => {
      state.filter = initialState.filter
      state.isDirty = false
    },
    clearAllFilter: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getRequestsByFilterFulfilledMatcher, (state) => {
      if (!state._inited) state._inited = true
    })
  },
})

export const { setFilter, clearFilter, clearAllFilter } = archiveFilterSlice.actions
export const { reducer: requestFilterReducer } = archiveFilterSlice
