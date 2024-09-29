export enum AppRoutes {
  RECORDS = "records",
  RECORD_DETAILS = "record_details",
  REQUESTS = "requests",
  REQUEST_DETAILS = "request_details",
  REQUEST_CREATE = "request_create",
  REQUEST_EDIT = "request_edit",
  NOT_FOUND = "not_found",
}

export const getRouteRecords = () => "/records"
export const getRouteRecordDetails = (guid: string) => `/records/${guid}`
export const getRouteRequests = () => "/"
export const getRouteRequestDetails = (guid: string) => `/requests/${guid}`
export const getRouteRequestCreate = () => "/requests/create"
export const getRouteRequestEdit = (guid: string) => `/requests/${guid}/edit`
