import { signatures } from "@/shared/const/file"
import { z } from "zod"

const mb = 1048576

export const errorMessages = {
  required: "Обязательное поле",
  size: "Файл должен весить не более 3 MB",
  type: "Файл должен быть в формате JPG, PNG, BMP, TIFF, PDF, DOC, DOCX, RTF, XLS, XLSX",
}

export const createRequestSchema = z.object({
  comment: z
    .string()
    .min(1, "Обязательное поле")
    .max(200, "Длинна коментария не должна превышать 200 символов"),
  file: z.any(),
  // .refine((files) => validateEmpty(files), errorMessages.required)
  // .refine((files) => validateSize(files), errorMessages.size)
  // .refine((files) => validateType(files), errorMessages.type),
})

export const validateEmpty = (files: File[]) => files?.length > 0
export const validateSize = (files: File[]) => files?.[0].size <= 3 * mb
export const validateType = (files: File[]) =>
  Object.values(signatures).some((signature) => {
    const sign = signature.split(",")

    return files?.[0].type === sign[0] || files?.[0].type === sign[1]
  })

export type CreateRequestSchema = z.infer<typeof createRequestSchema>
