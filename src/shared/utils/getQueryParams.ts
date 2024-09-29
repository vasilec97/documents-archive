export function getQueryParams(params: OptionalRecord<string, any>) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value)
    }
  })

  return `?${searchParams.toString()}`
}
