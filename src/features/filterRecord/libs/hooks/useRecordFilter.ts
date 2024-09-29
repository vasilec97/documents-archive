import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { clearFilter, setFilter } from "../../model/slice/recordFilterSlice"
import { ChangeEvent, useCallback, useState } from "react"
import { RecordStatus, TaxPeriod, DocumentType } from "@/entities/Record"
import { QuickNavigation } from "../../types/types"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getSearch } from "../../model/selectors/getSearch"

export const useRecordFilter = () => {
  const [sp, setSP] = useSearchParams()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(true)
  const search = useSelector(getSearch)

  const toggleFilter = useCallback(() => setOpen((prev) => !prev), [])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ search: e.target.value }))
  }, [])

  const handleStatusChange = useCallback(
    (value: Omit<RecordStatus, "NEW">) => () => {
      dispatch(setFilter({ recordStatus: value }))
    },
    []
  )

  const handleQuickNavigationClick = useCallback(
    (value: QuickNavigation) => () => {
      dispatch(setFilter({ quickNavigation: value, endDate: undefined, startDate: undefined }))
    },
    []
  )

  const handleTaxPeriodChange = useCallback((value: TaxPeriod) => {
    dispatch(setFilter({ taxPeriod: value }))
  }, [])

  const handleDocumentTypeChange = useCallback((value: DocumentType) => {
    dispatch(setFilter({ documentType: value }))
  }, [])

  const handleOrganizationNameChange = useCallback((value: string) => {
    dispatch(setFilter({ organizationName: value }))
  }, [])

  const handleClearClick = useCallback(() => {
    setSP({})
    dispatch(clearFilter())
  }, [])

  return {
    open,
    search,
    handleSearchChange,
    toggleFilter,
    handleStatusChange,
    handleQuickNavigationClick,
    handleTaxPeriodChange,
    handleDocumentTypeChange,
    handleOrganizationNameChange,
    handleClearClick,
  }
}
