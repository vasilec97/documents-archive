import { ReactNode } from "react"
import { DocumentType, RecordStatus, TaxPeriod } from "@/entities/Record"

export type DefaultValue = "ALL"

export type RecordFilter = {
  requestGuid?: string
  search: string
  startDate?: string | null
  endDate?: string | null
  quickNavigation?: QuickNavigation
  recordStatus?: Omit<RecordStatus, "NEW">
  taxPeriod: DefaultValue | TaxPeriod
  documentType: DefaultValue | DocumentType
  organizationName: DefaultValue | string
}

export type RecordFilterSchema = {
  filter: RecordFilter
  isDirty?: boolean
  _inited?: boolean
}

export type QuickNavigation = "TODAY" | "WEEK" | "MONTH"
export type RecordStatusMap = {
  value: Omit<RecordStatus, "NEW">
  label: string
  icon: ReactNode
}
export type QuickNavigationMap = {
  value: QuickNavigation
  label: string
}
export type TaxPeriodMap = {
  value: DefaultValue | TaxPeriod
  label: string
}
export type DocumentTypeMap = {
  value: DefaultValue | DocumentType
  label: string
}
