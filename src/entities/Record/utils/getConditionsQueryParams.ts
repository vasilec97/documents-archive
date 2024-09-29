import { RecordFilter } from "@/features/filterRecord"
import { DateTarget, getDateRange } from "@/shared/utils/getDateRange"

export const getConditionsQueryParams = (filter: Omit<RecordFilter, "search">) => {
  const dateTarget: DateTarget = filter.quickNavigation ? "quick_navigation" : "datepicker"

  const [startDate, endDate] = getDateRange(dateTarget, filter)

  const { quickNavigation, ...newFilter } = filter
  const params = { ...newFilter, startDate, endDate }

  const queryFilter = Object.entries(params)
    .map(([name, value]) => {
      if (value) {
        switch (name) {
          case "requestGuid":
            return `request_guid=${value}`
          case "startDate":
            return `request_date_gte=${value}`
          case "endDate":
            return `request_date_lte=${value}`
          case "recordStatus":
            return `record_status=${value}`
          case "taxPeriod":
            const isSpecificPeriod = value !== "ALL"
            return isSpecificPeriod ? `tax_period=${value}` : undefined
          case "documentType":
            const isSpecificType = value !== "ALL"
            return isSpecificType ? `document_type=${value}` : undefined
          case "organizationName":
            const isSpecificOrganization = value !== "ALL"
            return isSpecificOrganization ? `organization_name=${value}` : undefined
        }
      }

      return undefined
    })
    .filter((value) => !!value)
    .join("&")

  return queryFilter
}
