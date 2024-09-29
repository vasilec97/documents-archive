import { RecordFilter } from "@/features/filterRecord"
import { SortDirection } from "@/shared/types/sort"

export type RecordStatus = "NEW" | "IN_PROCESS" | "FINISHED" | "REJECTED"
export type TaxPeriod =
  | "PERIOD_MONTH"
  | "PERIOD_Q1"
  | "PERIOD_Q2"
  | "PERIOD_Q3"
  | "PERIOD_Q4"
  | "PERIOD_YEAR"
export type DocumentType = "IN" | "OUT"

export type RecordsRequest = {
  requestGuid?: string
  filter: Omit<RecordFilter, "search">
  pagination?: {
    _page?: number
    _per_page?: number
    _order?: SortDirection
  }
}

export type RecordFile = {
  file_name: string
  file_data: string
  file_presentation: string
}

export type RecordType = {
  request_guid: string
  document_date: string
  document_number: string
  document_presentation: string
  document_presentation_guid: string
  document_type: DocumentType
  record_date: string
  record_status: RecordStatus
  record_status_comment: string
  record_comment: string
  organization_name: string
  organization_guid: string
  tax_period: TaxPeriod
  tax_period_end_date: string
  files: RecordFile[]
}

export type RecordsResponse = {
  data: RecordType[]
  totalCount: number
}
