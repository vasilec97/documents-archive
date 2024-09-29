import { getRecordsByFilterFulfilledMatcher } from "@/entities/Record"
import { RecordFilter, RecordFilterSchema } from "../../types/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: RecordFilterSchema = {
  filter: {
    requestGuid: undefined,
    search: "",
    startDate: undefined,
    endDate: undefined,
    quickNavigation: undefined,
    recordStatus: undefined,
    taxPeriod: "ALL",
    documentType: "ALL",
    organizationName: "ALL",
  },
  isDirty: false,
  _inited: false,
}

const recordFilterSlice = createSlice({
  name: "recordFilter",
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Partial<RecordFilter>>) => {
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
    setIsDirty: (state, { payload }: PayloadAction<boolean>) => {
      state.isDirty = payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getRecordsByFilterFulfilledMatcher, (state) => {
      if (!state._inited) state._inited = true
    })
  },
})

export const { setFilter, clearFilter, clearAllFilter, setIsDirty } = recordFilterSlice.actions
export const { reducer: recordFilterReducer } = recordFilterSlice
