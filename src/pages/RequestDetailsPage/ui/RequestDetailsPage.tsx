import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RequestDetailsPage.module.scss"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useGetRequestByGuidQuery, useDeleteRequestByGuidMutation } from "@/entities/Request"
import { HStack, VStack } from "@/shared/ui/Stack"
import { Button } from "@/shared/ui/Button/Button"
import { formatDate } from "@/shared/lib/dateFormatter/dateFormatter"
import { getRouteRecords, getRouteRequestEdit, getRouteRequests } from "@/shared/const/router"
import { useMemo, useState } from "react"
import { formatFilesToDownload } from "@/shared/utils/formatFiles"
import { FilesDownloadList } from "@/shared/ui/FilesDownloadList/ui/FilesDownloadList"
import { requestStatuses } from "@/features/filterRequest/const/filter"
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader"

type RequestDetailsPageProps = {
  className?: string
}

export const RequestDetailsPage = ({ className }: RequestDetailsPageProps) => {
  const [sp] = useSearchParams()
  const status = sp.get("status")
  const { guid } = useParams()
  const navigate = useNavigate()
  const [filesToDownload, setFilesToDownload] = useState<{ uri: string; name: string }[]>([])
  const [deleteRequestMutation, { isLoading: isDeletingLoading }] = useDeleteRequestByGuidMutation()
  const { data, isLoading: isRequestLoading } = useGetRequestByGuidQuery(guid!)
  const request = data?.[0]

  const requestStatus = useMemo(() => {
    const value = request?.request_processed ? "FINISHED" : "IN_PROCESS"
    return requestStatuses.find((status) => status.value === value)
  }, [request])

  const formattedFiles = useMemo(
    () => formatFilesToDownload(request?.files, setFilesToDownload),
    [request?.files]
  )

  const handleStatusClick = () => {
    if (!request?.request_processed) return

    navigate(`${getRouteRecords()}?requestGuid=${request.request_guid}`)
  }

  const deleteRequest = async () => {
    const confirmation = confirm(
      "Вы действительно хотите удалить заявку? Это действие является безвозвратным."
    )

    if (!confirmation) return

    try {
      await deleteRequestMutation(request?.request_guid!)

      navigate(getRouteRequests())
    } catch (err) {
      console.error(err)
    }
  }

  const statusMods = {
    [cls.disabled]: !request?.request_processed,
  }

  if (isRequestLoading) return <PageLoader />

  if (!request) return

  return (
    <VStack className={cn(cls.RequestDetailsPage, {}, [className])} gap="32">
      <HStack justify="between" align="start" max>
        <HStack align="center" gap="24">
          {status == "NEW" && (
            <Button className={cls.statusBtn} color="success">
              NEW
            </Button>
          )}
          <p className={cls.date}>{formatDate(request!.request_date)}</p>
          <HStack className={cn(cls.recordsLink, statusMods)} onClick={handleStatusClick}>
            {requestStatus?.icon}
          </HStack>
        </HStack>
        {!request.request_processed && (
          <HStack align="center" gap="16">
            <Link to={getRouteRequestEdit(guid!)}>
              <Button className={cls.editButton} color="secondary" size="l">
                Редактировать
              </Button>
            </Link>
            <Button
              onClick={deleteRequest}
              color="danger"
              size="l"
              isLoading={isDeletingLoading}
              disabled={isDeletingLoading}
            >
              Удалить заявку
            </Button>
          </HStack>
        )}
      </HStack>
      <FilesDownloadList
        files={formattedFiles}
        filesToDownload={filesToDownload}
        filesAmount={request.files.length}
        downloadable
      />
      <VStack gap="8">
        <HStack className={cls.descriptionTitle}>Примечание</HStack>
        <HStack>{request.request_comment}</HStack>
      </VStack>
    </VStack>
  )
}
