import { signatures } from "@/shared/const/file"

type ArchiveFile = {
  file_name: string
  file_data: string
}

type ArchiveFileWithMimeType = ArchiveFile & {
  mimeType: string
}

export type FileDownload = {
  fileName: string
  mimeType: string
  uri: string
  file: File
}

export const formatFilesToDownload = (
  files: ArchiveFile[] | undefined,
  setFilesToDownload?: React.Dispatch<
    React.SetStateAction<
      {
        uri: string
        name: string
      }[]
    >
  >
) => {
  if (!files) return []

  const filesWithMimeType = files.map(addMimeType)
  const updatedFiles = base64ToFile(filesWithMimeType)
  const filesToDownload = updatedFiles.map(({ uri, fileName }) => ({ uri, name: fileName }))

  setFilesToDownload?.(filesToDownload)

  return updatedFiles
}

function addMimeType(file: ArchiveFile) {
  let mimeType = ""

  for (const signature in signatures) {
    if (file.file_data.startsWith(signature)) {
      if (signature == "0M8R4KGxGuE") {
        mimeType =
          file.file_name.split(".")[1] == "doc"
            ? signatures[signature].split(",")[0]
            : signatures[signature].split(",")[1]
      }

      if (signature == "UE5PK") {
        mimeType =
          file.file_name.split(".")[1] == "docx"
            ? signatures[signature].split(",")[0]
            : signatures[signature].split(",")[1]
      }

      mimeType = signatures[signature as keyof typeof signatures]

      return { ...file, mimeType }
    }
  }

  return { ...file, mimeType }
}

function base64ToFile(files: ArchiveFileWithMimeType[]) {
  const updatedFiles: FileDownload[] = []

  for (const file of files) {
    const { file_data: base64String, file_name: fileName, mimeType } = file

    const base64Data = base64String.replace(/^data:.+;base64,/, "")
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: mimeType })
    const blobFile = new File([blob], fileName)
    const uri = URL.createObjectURL(blob)

    updatedFiles.push({ fileName, uri, mimeType, file: blobFile })
  }

  return updatedFiles
}

export async function formatFilesToUpload(files: FileDownload[]) {
  const updatedFiles = []

  for (const { file, fileName } of files) {
    try {
      const base64 = await fileToBase64(file)
      updatedFiles.push({ file_data: base64, file_name: fileName })
    } catch (err) {
      console.error(err)
    }
  }

  return updatedFiles
}

async function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const base64String = (reader?.result as string)?.replace("data:", "").replace(/^.+,/, "")
      resolve(base64String)
    }
    reader.onerror = (e) => reject("Ошибка конвертирования файла в строку base64 формата")

    reader.readAsDataURL(file)
  })
}
