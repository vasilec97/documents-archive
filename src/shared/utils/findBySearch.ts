import { RecordType } from "@/entities/Record"
import { RequestType } from "@/entities/Request"

export const findBySearch =
  (search: string) => (data: Partial<RecordType> | Partial<RequestType>) => {
    return Object.values(data).some(
      (field) => typeof field === "string" && field.toLowerCase().includes(search.toLowerCase())
    )
  }
