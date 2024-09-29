import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RecordsPage.module.scss"
import { PageTitle } from "@/shared/ui/PageTitle/PageTitle"
import { useSelector } from "react-redux"
import { VStack } from "@/shared/ui/Stack"
import {
  RecordFilterFeature,
  clearAllRecordFilter,
  getIsRecordFilterDirty,
  getRecordFilter,
  getRecordFilterSkip,
  setIsRecordFilterDirty,
  setRecordFilter,
} from "@/features/filterRecord"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useCallback, useEffect, useMemo, useState } from "react"
import { SortDirection } from "@/shared/types/sort"
import { Pagination, usePagination } from "@/shared/ui/Pagination"
import {
  useGetRecordsByFilterQuery,
  useGetOrganizationNamesQuery,
  RecordList,
} from "@/entities/Record"
import { useSearchParams } from "react-router-dom"
import { findBySearch } from "@/shared/utils/findBySearch"

type RecordsPageProps = {
  className?: string
}

export const RecordsPage = ({ className }: RecordsPageProps) => {
  const dispatch = useAppDispatch()
  const [sp] = useSearchParams()
  const requestGuid = sp.get("requestGuid") as string | undefined
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const recordFilter = useSelector(getRecordFilter)
  const isFilterDirty = useSelector(getIsRecordFilterDirty)
  const skip = useSelector(getRecordFilterSkip)
  const { search, ...filterWithoutSearch } = recordFilter

  useEffect(() => {
    if (requestGuid) dispatch(setIsRecordFilterDirty(true))

    return () => {
      dispatch(clearAllRecordFilter())
    }
  }, [requestGuid])

  const { currentPage, itemsOnPage, onChangePage, onChangePageAmount } = usePagination()

  const {
    data: records,
    isFetching,
    isLoading,
  } = useGetRecordsByFilterQuery(
    {
      requestGuid,
      filter: filterWithoutSearch,
      pagination: {
        _page: currentPage,
        _per_page: +itemsOnPage,
        _order: sortDirection,
      },
    },
    {
      skip, // Skip request when only startDate selected
    }
  )

  const { data: organizationNames } = useGetOrganizationNamesQuery()

  const filtredRecordsBySearch = useMemo(() => {
    return records?.data.filter(findBySearch(search))
  }, [search, records?.data])

  const toggleSortDirection = useCallback(() => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"))
  }, [])

  return (
    <VStack className={cn(cls.RequestsPage, {}, [className])} gap="32" max>
      <PageTitle>Архив заявок</PageTitle>
      <RecordFilterFeature
        filter={recordFilter}
        isDirty={!!isFilterDirty}
        organizationNames={organizationNames}
      />
      <RecordList
        records={filtredRecordsBySearch || []}
        sortAction={toggleSortDirection}
        sortDirection={sortDirection}
        pagination={
          <Pagination
            currentPage={currentPage}
            onChangePage={onChangePage}
            onChangePageAmount={onChangePageAmount}
            itemsOnPage={itemsOnPage}
            itemsLength={records?.totalCount || 0}
          />
        }
        isLoading={isLoading || isFetching}
      />
    </VStack>
  )
}
