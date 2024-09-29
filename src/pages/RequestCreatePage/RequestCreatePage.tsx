import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RequestCreatePage.module.scss"
import { PageTitle } from "@/shared/ui/PageTitle/PageTitle"
import { RequestForm } from "@/features/createRequest"
import { VStack } from "@/shared/ui/Stack"

type RequestCreatePageProps = {
  className?: string
}

export const RequestCreatePage = ({ className }: RequestCreatePageProps) => {
  return (
    <VStack className={cn(cls.CreateRequestPage, {}, [className])} gap="32" max>
      <PageTitle>Создание новой заявки</PageTitle>
      <RequestForm />
    </VStack>
  )
}
