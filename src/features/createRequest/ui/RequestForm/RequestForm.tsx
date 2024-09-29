import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RequestForm.module.scss"
import { VStack } from "@/shared/ui/Stack"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CreateRequestSchema,
  createRequestSchema,
  errorMessages,
} from "../../model/schema/createRequestSchema"
import { UploadButton } from "@/features/createRequest/ui/UploadButton/UploadButton"
import { Button } from "@/shared/ui/Button/Button"
import {
  FileDownload,
  formatFilesToDownload,
  formatFilesToUpload,
} from "@/shared/utils/formatFiles"
import { ReactNode, useState } from "react"
import { FilesDownloadList } from "@/shared/ui/FilesDownloadList"
import { TextArea } from "@/shared/ui/TextArea/TextArea"
import { RequestType, useCreateRequestMutation, useUpdateRequestMutation } from "@/entities/Request"
import { getMidnightDate } from "@/shared/utils/getMidnightDate"
import { CreateRequestType } from "@/entities/Request/types/types"
import { useNavigate } from "react-router-dom"
import { getRouteRequestDetails } from "@/shared/const/router"

interface CreateRequestFormProps {
  className?: string
  request?: RequestType
}

export const RequestForm = ({ className, request }: CreateRequestFormProps) => {
  const [files, setFiles] = useState<FileDownload[]>(formatFilesToDownload(request?.files))
  const requestMutation = request ? useUpdateRequestMutation : useCreateRequestMutation
  const [requestAction, { isLoading }] = requestMutation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<CreateRequestSchema>({
    resolver: zodResolver(createRequestSchema),
    mode: "onSubmit",
    defaultValues: {
      comment: request?.request_comment || "",
    },
  })

  const submitForm = async ({ comment }: CreateRequestSchema) => {
    if (!files.length)
      return setError("file", {
        message: errorMessages.required,
      })

    const data: Partial<CreateRequestType> = {
      request_comment: comment,
      files: await formatFilesToUpload(files),
    }
    const uniqeId = window.crypto.randomUUID()

    if (!request) {
      data.id = uniqeId
      data.request_guid = uniqeId
      data.request_processed = false
      data.request_date = new Date().toISOString()
    } else {
      data.request_guid = request.request_guid
    }

    try {
      // @ts-ignore
      await requestAction(data).unwrap()
      const qp = new URLSearchParams({
        status: "NEW",
      })
      const queryString = request ? "" : `?${qp.toString()}`

      navigate(
        `${getRouteRequestDetails(
          request ? request.request_guid : data.request_guid!
        )}${queryString}`
      )
    } catch (err) {
      setError("root", {
        message: "Кажется что-то пошло не так, попробуйте снова.",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className={cn(cls.RequestForm, {}, [className])}>
      <VStack className={cls.field} gap="16" max>
        <p className={cls.label}>
          Выберите файлы{" "}
          <span className={cls.formats}>
            {"("}JPG, PNG, BMP, TIFF, PDF, DOC, DOCX, RTF, XLS, XLSX{")"}
          </span>
        </p>
        <UploadButton
          {...register("file")}
          setError={setError}
          setFiles={setFiles}
          empty={!files.length}
        />
        {errors.file && <p className={cls.error}>{errors.file?.message as ReactNode}</p>}
        <FilesDownloadList files={files} filesAmount={files.length || 0} setFiles={setFiles} />
      </VStack>
      <VStack className={cls.field} gap="8" max>
        <TextArea
          {...register("comment")}
          title="Комментарий к заявке"
          error={errors?.comment?.message}
          withCounter
          max
        />
      </VStack>
      <Button
        type="submit"
        color="secondary"
        isLoading={isLoading}
        disabled={!isDirty || isLoading}
      >
        {!request ? "Создать заявку" : "Обновить заявку"}
      </Button>
      {errors?.root && <p className={cls.error}>{errors.root?.message}</p>}
    </form>
  )
}
