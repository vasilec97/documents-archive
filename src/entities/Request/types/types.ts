import { RequestFilter } from "@/features/filterRequest"
import { SortDirection } from "@/shared/types/sort"

type FileType = {
  file_name: string
  file_data: string
}

export type RequestAll = {
  filter: Omit<RequestFilter, 'search'>
  pagination?: {
    _page?: number
    _per_page?: number
    _order?: SortDirection
  }
}
export type RequestType = {
  request_guid: string
  request_date: string
  request_comment: string
  request_processed: false
  files: FileType[]
}

export type RequestResponse = {
  data: RequestType[]
  totalCount: number
}

export type RequestStatus = "IN_PROCESS" | "FINISHED"

export type CreateRequestType = RequestType & {
  id: string
}
