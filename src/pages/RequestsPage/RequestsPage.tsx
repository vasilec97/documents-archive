import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RequestsPage.module.scss"
import { useSelector } from "react-redux"
import {
  RequestFilterFeature,
  clearAllRequestFilter,
  getIsRequestFilterDirty,
  getRequestFilter,
  getRequestFilterSkip,
} from "@/features/filterRequest"
import { useGetRequestsByFilterQuery } from "@/entities/Request"
import { PageTitle } from "@/shared/ui/PageTitle/PageTitle"
import { HStack, VStack } from "@/shared/ui/Stack"
import { RequestList } from "@/entities/Request"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useCallback, useEffect, useMemo, useState } from "react"
import { SortDirection } from "@/shared/types/sort"
import { Pagination, usePagination } from "@/shared/ui/Pagination"
import { Link, useNavigate } from "react-router-dom"
import { getRouteRecords, getRouteRequestCreate } from "@/shared/const/router"
import { MouseEvent } from "react"
import { findBySearch } from "@/shared/utils/findBySearch"
import { Button } from "@/shared/ui/Button/Button"

type RequestsPageProps = {
  className?: string
}

export const RequestsPage = ({ className }: RequestsPageProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const requestFilter = useSelector(getRequestFilter)
  const isFilterDirty = useSelector(getIsRequestFilterDirty)
  const skip = useSelector(getRequestFilterSkip)
  const { search, ...filterWithoutSearch } = requestFilter

  const { currentPage, itemsOnPage, onChangePage, onChangePageAmount } = usePagination()

  useEffect(() => {
    return () => {
      dispatch(clearAllRequestFilter())
    }
  }, [])

  const {
    data: requests,
    isFetching,
    isLoading,
  } = useGetRequestsByFilterQuery(
    {
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

  const filtredRequestsBySearch = useMemo(() => {
    return requests?.data.filter(findBySearch(search))
  }, [search, requests?.data])

  const toggleSortDirection = useCallback(() => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"))
  }, [])

  const statusAction = useCallback(
    (guid: string) => (e: MouseEvent<SVGSVGElement>) => {
      e.stopPropagation()

      navigate(`${getRouteRecords()}?requestGuid=${guid}`)
    },
    [dispatch, requestFilter]
  )

  return (
    <VStack className={cn(cls.RequestsPage, {}, [className])} gap="32" max>
      <HStack justify="between" align="center" max>
        <PageTitle>Архив заявок</PageTitle>
        <Link to={getRouteRequestCreate()}>
          <Button color="secondary" size="l">
            Создать заявку
          </Button>
        </Link>
      </HStack>
      <RequestFilterFeature filter={requestFilter} isDirty={!!isFilterDirty} />
      <RequestList
        requests={filtredRequestsBySearch || []}
        statusAction={statusAction}
        sortAction={toggleSortDirection}
        sortDirection={sortDirection}
        pagination={
          <Pagination
            currentPage={currentPage}
            onChangePage={onChangePage}
            onChangePageAmount={onChangePageAmount}
            itemsOnPage={itemsOnPage}
            itemsLength={requests?.totalCount || 0}
          />
        }
        isLoading={isLoading || isFetching}
      />
    </VStack>
  )
}
