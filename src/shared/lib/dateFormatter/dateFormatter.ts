const DATE_FORMATTER = new Intl.DateTimeFormat("ru-RU", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

export const formatDate = (date: string | undefined) => {
  if (!date) return ""
  return DATE_FORMATTER.format(new Date(date))
}
