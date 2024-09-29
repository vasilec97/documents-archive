import { getMidnightDate } from "@/shared/utils/getMidnightDate"

export const getRequestDates = (date: string) => {
  const startDate = getMidnightDate(new Date())
  const endDate = new Date(new Date(startDate).getTime() + 1000 * 60 * 60 * 24).toISOString()

  return { startDate, endDate }
}
