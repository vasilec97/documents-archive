import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RequestEditPage.module.scss"
import { PageTitle } from "@/shared/ui/PageTitle/PageTitle"
import { RequestForm } from "@/features/createRequest"
import { VStack } from "@/shared/ui/Stack"
import { useParams } from "react-router-dom"
import { useGetRequestByGuidQuery } from "@/entities/Request"
import { useForbidden } from "@/shared/lib/hooks/useForbidden/useForbidden"
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader"

type RequestEditPageProps = {
  className?: string
}

type RequestEditPageParams = {
  guid: string
}

export const RequestEditPage = ({ className }: RequestEditPageProps) => {
  const { guid } = useParams<RequestEditPageParams>()
  const { data, isFetching, isLoading } = useGetRequestByGuidQuery(guid!)
  const request = data?.[0]

  useForbidden({ condition: !!request && !!request?.request_processed })

  if (isFetching || isLoading) {
    return <PageLoader />
  }

  return (
    <VStack className={cn(cls.RequestEditPage, {}, [className])} gap="32" max>
      <PageTitle>Редактирование заявки</PageTitle>
      <RequestForm request={request} />
    </VStack>
  )
}
