import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { clearFilter, setFilter } from "../../model/slice/requestFilterSlice"
import { ChangeEvent, useCallback, useState } from "react"
import { QuickNavigation } from "@/shared/types/archive"
import { RequestStatus } from "@/entities/Request"
import { getSearch } from "../../model/selectors/getSearch"
import { useSelector } from "react-redux"

export const useRequestFilter = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(true)
  const search = useSelector(getSearch)

  const toggleFilter = useCallback(() => setOpen((prev) => !prev), [])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ search: e.target.value }))
  }, [])

  const handleStatusChange = useCallback(
    (value: RequestStatus) => () => {
      dispatch(setFilter({ requestStatus: value }))
    },
    []
  )

  const handleQuickNavigationClick = useCallback(
    (value: QuickNavigation) => () => {
      dispatch(setFilter({ quickNavigation: value, endDate: undefined, startDate: undefined }))
    },
    []
  )

  const handleClearClick = useCallback(() => dispatch(clearFilter()), [])

  return {
    open,
    search,
    handleSearchChange,
    toggleFilter,
    handleStatusChange,
    handleQuickNavigationClick,
    handleClearClick,
  }
}
