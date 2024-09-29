export const REQUESTS = "/requests"
export const REQUEST_BY_ID = (guid: string) => `/requests/${guid}`
export const RECORDS = "/archive_records"
export const RECORD_BY_ID = (guid: string) => `/archive_records/?request_guid=${guid}`
