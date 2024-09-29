import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react"
import { DefaultInputPropsType, Input } from "@/shared/ui/Input/Input"
import { Button } from "@/shared/ui/Button/Button"
import { signatures } from "@/shared/const/file"
import {
  errorMessages,
  validateEmpty,
  validateSize,
  validateType,
} from "../../model/schema/createRequestSchema"
import { UseFormSetError } from "react-hook-form"
import { FileDownload } from "@/shared/utils/formatFiles"

interface UploadButtonProps {
  className?: string
  setError: UseFormSetError<{
    comment?: string | undefined
    file?: any
  }>
  setFiles: Dispatch<SetStateAction<FileDownload[]>>
  empty: boolean
}

export const UploadButton = ({
  className,
  type,
  onChange,
  setError,
  setFiles,
  empty,
  ...rest
}: UploadButtonProps & DefaultInputPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    inputRef?.current?.click()
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as unknown as File[]

    if (empty && !validateEmpty(files))
      return setError("file", {
        message: errorMessages.required,
      })

    if (!validateSize(files))
      return setError("file", {
        message: errorMessages.size,
      })

    if (!validateType(files))
      return setError("file", {
        message: errorMessages.type,
      })

    const { type: mimeType, name: fileName } = files[0]
    const uri = URL.createObjectURL(files[0])

    setFiles((prev) => [...prev, { fileName, mimeType, uri, file: files[0] }])
    onChange?.(e)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        accept={Object.values(signatures).join(",")}
        onChange={onFileChange}
        {...rest}
      />
      <Button className={className} color="secondary" onClick={onClick}>
        Добавить файл
      </Button>
    </>
  )
}
