import { ReactNode } from "react"
import { RequestStatus } from "@/entities/Request"
import { QuickNavigation } from "@/shared/types/archive"

export type DefaultValue = "ALL"

export type RequestFilter = {
  search: string
  startDate?: string | null
  endDate?: string | null
  quickNavigation?: QuickNavigation
  requestStatus?: RequestStatus
}

export type RequestFilterSchema = {
  filter: RequestFilter
  isDirty?: boolean
  _inited: boolean
}

export type RequestStatusMap = {
  value: RequestStatus
  label: string
  icon: ReactNode
}
export type QuickNavigationMap = {
  value: QuickNavigation
  label: string
}
