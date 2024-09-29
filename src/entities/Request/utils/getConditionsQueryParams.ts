import { RequestFilter } from "@/features/filterRequest"
import { DateTarget, getDateRange } from "@/shared/utils/getDateRange"

export const getConditionsQueryParams = (filter: Omit<RequestFilter, 'search'>) => {
  const dateTarget: DateTarget = filter.quickNavigation ? "quick_navigation" : "datepicker"

  const [startDate, endDate] = getDateRange(dateTarget, filter)

  const { quickNavigation, ...newFilter } = filter
  const params = { ...newFilter, startDate, endDate }

  const queryFilter = Object.entries(params)
    .map(([name, value]) => {
      if (value) {
        switch (name) {
          case "startDate":
            return `request_date_gte=${value}`
          case "endDate":
            return `request_date_lte=${value}`
          case "requestStatus":
            const boolean = value == "IN_PROCESS" ? false : true
            return `request_processed=${boolean}`
        }
      }

      return undefined
    })
    .filter((value) => !!value)
    .join("&")

  return queryFilter
}
