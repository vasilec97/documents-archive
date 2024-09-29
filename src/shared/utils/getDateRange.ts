import { RequestFilter } from "@/features/filterRequest"
import { RecordFilter } from "@/features/filterRecord"
import { getMidnightDate } from "@/shared/utils/getMidnightDate"

export type DateTarget = "quick_navigation" | "datepicker"

const valueToDate = {
  WEEK: 60 * 60 * 24 * 7 * 1000, // ms
  MONTH: 60 * 60 * 24 * 30 * 1000, // ms
}

export const getDateRange = <
  T extends Omit<RequestFilter, "search"> | Omit<RecordFilter, "search">
>(
  type: DateTarget,
  filter: T
) => {
  if (type == "quick_navigation") {
    const endDate = new Date()
    const startDate =
      filter.quickNavigation == "TODAY"
        ? new Date()
        : new Date(endDate.getTime() - valueToDate[filter.quickNavigation!])

    return [getMidnightDate(startDate), getMidnightDate(endDate)]
  }

  if (filter.startDate && filter.endDate) {
    return [getMidnightDate(new Date(filter.startDate)), getMidnightDate(new Date(filter.endDate!))]
  }

  return [undefined, undefined]
}
