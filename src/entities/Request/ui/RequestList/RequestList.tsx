import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RequestList.module.scss"
import { RequestType } from "../../types/types"
import { RequestItem } from "../RequestItem/RequestItem"
import { ReactNode, memo, MouseEvent } from "react"
import { HStack } from "@/shared/ui/Stack"
import { SortDirection } from "@/shared/types/sort"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Loader } from "@/shared/ui/Loader/Loader"

interface RequestListProps {
  requests: RequestType[]
  statusAction: (date: string) => (e: MouseEvent<SVGSVGElement>) => void
  sortAction: () => void
  sortDirection: SortDirection
  pagination: ReactNode
  isLoading?: boolean
  className?: string
}

export const RequestList = memo(
  ({
    className,
    requests,
    statusAction,
    sortDirection,
    sortAction,
    pagination,
    isLoading,
  }: RequestListProps) => {
    return (
      <HStack className={cn(cls.RequestList, {}, [className])} max>
        <table className={cls.table}>
          <thead>
            <tr>
              <th className={cls.dateCell} onClick={sortAction}>
                <p>Дата</p>
                {sortDirection === "desc" ? (
                  <ArrowDown width={16} height={16} />
                ) : (
                  <ArrowUp width={16} height={16} />
                )}
              </th>
              <th>Статус</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className={cls.loaderCell} colSpan={3}>
                  <Loader />
                </td>
              </tr>
            ) : (
              requests.map((request) => {
                return (
                  <RequestItem
                    key={request.request_guid}
                    request={request}
                    statusAction={statusAction}
                  />
                )
              })
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>{pagination}</td>
            </tr>
          </tfoot>
        </table>
      </HStack>
    )
  }
)

RequestList.displayName = "RequestList"
