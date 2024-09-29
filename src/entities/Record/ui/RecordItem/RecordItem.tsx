import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RecordItem.module.scss"
import { formatDate } from "@/shared/lib/dateFormatter/dateFormatter"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getRouteRecordDetails } from "@/shared/const/router"
import { useMemo } from "react"
import { RecordType } from "@/entities/Record"
import { recordStatuses, taxPeriods } from "@/features/filterRecord"

interface RequestItemProps {
  className?: string
  record: RecordType
}

export const RecordItem = ({ className, record }: RequestItemProps) => {
  const [sp, setSP] = useSearchParams()
  const navigate = useNavigate()

  const recordStatusIcon = useMemo(
    () => recordStatuses.find(({ value }) => record.record_status == value)!.icon,
    []
  )

  const taxPeriod = useMemo(
    () => taxPeriods.find(({ value }) => record.tax_period === value)!.label,
    []
  )

  const navigateToDetails = () => {
    setSP({})
    navigate(getRouteRecordDetails(record.request_guid))
  }

  return (
    <tr className={cn(cls.RecordItem, {}, [className])} onClick={navigateToDetails}>
      <td>{formatDate(record.record_date)}</td>
      <td className={cls.iconCell}>{recordStatusIcon}</td>
      <td>{record.document_number}</td>
      <td>{record.document_presentation}</td>
      <td>{record.organization_name}</td>
      <td>{taxPeriod}</td>
    </tr>
  )
}
