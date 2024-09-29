import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RecordDetailsPage.module.scss"
import { useGetRecordByRequestGuidQuery } from "@/entities/Record"
import { useParams } from "react-router-dom"
import { HStack, VStack } from "@/shared/ui/Stack"
import { useMemo, useState } from "react"
import { recordStatuses, documentTypes, taxPeriods } from "@/features/filterRecord"
import { formatDate } from "@/shared/lib/dateFormatter/dateFormatter"
import { FilesDownloadList } from "@/shared/ui/FilesDownloadList"
import { formatFilesToDownload } from "@/shared/utils/formatFiles"
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader"

interface RecordDetailsPageProps {
  className?: string
}

export const RecordDetailsPage = ({ className }: RecordDetailsPageProps) => {
  const { guid } = useParams()
  const [filesToDownload, setFilesToDownload] = useState<{ uri: string; name: string }[]>([])
  const { data: records, isLoading } = useGetRecordByRequestGuidQuery(guid!)
  const record = records?.[0]

  const formattedFiles = useMemo(
    () => formatFilesToDownload(record?.files, setFilesToDownload),
    [record?.files]
  )

  const statusIcon = useMemo(() => {
    return (
      Object.values(recordStatuses).find(({ value }) => value === record?.record_status)?.icon || ""
    )
  }, [record])

  const documentType = useMemo(() => {
    return (
      Object.values(documentTypes).find(({ value }) => value === record?.document_type)?.label || ""
    )
  }, [record])

  const taxPeriod = useMemo(() => {
    return Object.values(taxPeriods).find(({ value }) => value === record?.tax_period)?.label || ""
  }, [record])

  if (isLoading) {
    return <PageLoader />
  }

  if (!record) return

  return (
    <VStack className={cn(cls.RecordDetailsPage, {}, [className])} gap="32" max>
      <HStack align="center" gap="32">
        <p className={cls.date}>{formatDate(record.record_date)}</p>
        <p className={cls.organiztion}>{record.organization_name}</p>
        <p className={cn(cls.status, {}, [cls[record.record_status.toLowerCase()]])}>
          {statusIcon}
        </p>
        {record.record_status_comment && <p>{record.record_status_comment}</p>}
      </HStack>
      <HStack className={cls.infoBlock} wrap="wrap" gap="32">
        <HStack className={cls.field} justify="between" gap="16">
          <p className={cls.label}>Дата документа:</p>
          <p className={cls.value}>{formatDate(record.document_date)}</p>
        </HStack>
        <HStack className={cls.field} justify="between" gap="16">
          <p className={cls.label}>Номер:</p>
          <p className={cls.value}>{record.document_number}</p>
        </HStack>
        <HStack className={cls.field} justify="between" gap="16">
          <p className={cls.label}>Тип:</p>
          <p className={cls.value}>{documentType}</p>
        </HStack>
        <HStack className={cls.field} justify="between" gap="16">
          <p className={cls.label}>Налоговый период:</p>
          <p className={cls.value}>{taxPeriod}</p>
        </HStack>
        <HStack className={cls.field} justify="between" gap="16">
          <p className={cls.label}>Конец периода:</p>
          <p className={cls.value}>{formatDate(record?.tax_period_end_date)}</p>
        </HStack>
        <HStack className={cls.field} justify="between" gap="16">
          <p className={cls.label}>Год:</p>
          <p className={cls.value}>{new Date(record.tax_period_end_date).getUTCFullYear()}</p>
        </HStack>
      </HStack>
      <FilesDownloadList
        files={formattedFiles}
        filesToDownload={filesToDownload}
        filesAmount={record?.files?.length || 0}
        downloadable
      />
    </VStack>
  )
}
