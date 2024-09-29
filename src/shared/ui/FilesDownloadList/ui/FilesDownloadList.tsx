import cls from "./FilesDownloadList.module.scss"
import { mapFileExtensionToIcon } from "../const/file"
import { FileDownload } from "@/shared/utils/formatFiles"
import { HStack, VStack } from "@/shared/ui/Stack"
import { downloadFile } from "@/shared/utils/downloadFile"
import { DownloadIcon, Eye, X } from "lucide-react"
import { cn } from "@/shared/lib/classNames/classNames"
import { Dispatch, SetStateAction, useState } from "react"

interface FilesDownloadListProps {
  className?: string
  files?: FileDownload[]
  filesToDownload?: { uri: string; name: string }[]
  filesAmount: number
  setFiles?: Dispatch<SetStateAction<FileDownload[]>>
  downloadable?: boolean
}

export const FilesDownloadList = ({
  className,
  files,
  setFiles,
  filesAmount,
  filesToDownload,
  downloadable,
}: FilesDownloadListProps) => {
  const showFile = (uri: string) => () => {
    window.open(uri)
  }

  const handleDownloadClick = (fileData: { uri: string; name: string }) => () => {
    downloadFile(fileData)
  }

  const removeFile = (uri: string) => () => {
    setFiles?.((prev) => prev.filter((file) => file.uri !== uri))
  }

  const formatFileName = (fileName: string) => {
    const MAX_SIZE = 14
    const [name, ext] = fileName.split(".")

    return name.length > MAX_SIZE
      ? `${name.slice(0, MAX_SIZE - 4)}...${name.slice(name.length - 2)}.${ext}`
      : fileName
  }

  const downloadAllFiles: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()

    filesToDownload?.forEach(downloadFile)
  }

  return (
    <VStack className={cn(cls.FilesDownloadList, {}, [className])} gap="32" max>
      <HStack gap="16" max>
        <p className={cls.filesTitle}>{filesAmount} файлов</p>
        {!setFiles && <DownloadIcon role="button" onClick={downloadAllFiles} cursor="pointer" />}
        <span className={cls.line}></span>
      </HStack>
      <HStack align="stretch" wrap="wrap" max>
        {files?.map(({ mimeType, fileName, uri }) => {
          return (
            <HStack key={uri} justify="center" className={cls.fileBlock}>
              <VStack gap="4" align="center">
                {mimeType == "image/jpeg" || mimeType == "image/png" ? (
                  <img className={cls.fileImage} src={uri} />
                ) : (
                  mapFileExtensionToIcon[mimeType as keyof typeof mapFileExtensionToIcon]
                )}
                <p className={cls.fileText}>{formatFileName(fileName)}</p>
                <span className={cls.overlay}></span>
                <HStack className={cls.fileActions} gap="8" align="center">
                  <HStack
                    role="button"
                    justify="center"
                    className={cls.action}
                    onClick={showFile(uri)}
                  >
                    <Eye className={cls.actionIcon} />
                  </HStack>
                  {downloadable && (
                    <HStack
                      role="button"
                      justify="center"
                      className={cls.action}
                      onClick={handleDownloadClick({ uri, name: fileName })}
                    >
                      <DownloadIcon className={cls.actionIcon} />
                    </HStack>
                  )}
                </HStack>
                {setFiles && (
                  <HStack
                    role="button"
                    justify="center"
                    className={cn(cls.action, {}, [cls.remove])}
                    onClick={removeFile(uri)}
                  >
                    <X className={cls.actionIcon} />
                  </HStack>
                )}
              </VStack>
            </HStack>
          )
        })}
      </HStack>
    </VStack>
  )
}
