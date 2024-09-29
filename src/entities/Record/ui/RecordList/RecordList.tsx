import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RecordList.module.scss"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Loader } from "@/shared/ui/Loader/Loader"
import { RecordType } from "../../types/types"
import { ReactNode, memo } from "react"
import { SortDirection } from "@/shared/types/sort"
import { HStack } from "@/shared/ui/Stack"
import { RecordItem } from "../RecordItem/RecordItem"

interface RequestListProps {
  records: RecordType[]
  sortAction: () => void
  sortDirection: SortDirection
  pagination: ReactNode
  isLoading?: boolean
  className?: string
}

export const RecordList = memo(
  ({ className, records, sortDirection, sortAction, pagination, isLoading }: RequestListProps) => {
    const emptyTable = (
      <td className={cls.empty} colSpan={6}>
        Записей по заданным по параметрам не найдено.
      </td>
    )

    return (
      <HStack className={cn(cls.RecordList, {}, [className])} max>
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
              <th>Номер документа</th>
              <th>Вид документа</th>
              <th>Имя организации</th>
              <th>Налоговый период</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className={cls.loaderCell} colSpan={6}>
                  <Loader />
                </td>
              </tr>
            ) : records.length ? (
              records.map((record) => {
                return <RecordItem key={record.request_guid} record={record} />
              })
            ) : (
              emptyTable
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

RecordList.displayName = "RecordList"
