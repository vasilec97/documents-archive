import { RequestFilter } from "@/features/filterRequest"
import { useAppDispatch } from "../useAppDispatch/useAppDispatch"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { useCallback } from "react"
import { RecordFilter } from "@/features/filterRecord"

type Config = {
  action: ActionCreatorWithPayload<Partial<RequestFilter | RecordFilter>>
  endDate?: Date | null
}

export const useDatepicker = ({ action, endDate }: Config) => {
  const dispatch = useAppDispatch()

  const onStartDateChange = useCallback((date: Date | null) => {
    dispatch(action({ startDate: date?.toISOString() }))

    // @ts-ignore
    if (date?.getTime() > endDate?.getTime()) {
      dispatch(action({ endDate: undefined }))
    }
  }, [])

  const onEndDateChange = useCallback((date: Date | null) => {
    dispatch(action({ endDate: date?.toISOString(), quickNavigation: undefined }))
  }, [])

  return {
    onStartDateChange,
    onEndDateChange,
  }
}
