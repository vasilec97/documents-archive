import { getConditionsQueryParams } from "../utils/getConditionsQueryParams"
import { RecordType, RecordsRequest, RecordsResponse } from "../types/types"
import { rtkApi } from "@/shared/api/rtkApi"
import { RECORDS, RECORD_BY_ID } from "@/shared/const/endpoints"

export const recordApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecordsByFilter: builder.query<RecordsResponse, RecordsRequest>({
      query: (data) => {
        const conditionsQp = getConditionsQueryParams({
          ...data.filter,
          requestGuid: data?.requestGuid,
        })

        const paginationQp = new URLSearchParams({
          _page: String(data?.pagination?._page || "1"),
          _per_page: String(data?.pagination?._per_page || "30"),
          _sort: "request_date",
          _order: data?.pagination?._order || "desc",
        })

        return `${RECORDS}?${conditionsQp}&${paginationQp}`
      },
      transformResponse(response, meta) {
        return {
          data: response as RecordType[],
          totalCount: Number(meta?.response?.headers.get("X-Total-Count")),
        }
      },
    }),
    getOrganizationNames: builder.query<string[], void>({
      query: () => `${RECORDS}`,
      transformResponse(response) {
        return (response as RecordType[]).map(({ organization_name }) => organization_name)
      },
    }),
    getRecordByRequestGuid: builder.query<RecordType[], string>({
      query: (guid) => RECORD_BY_ID(guid),
    }),
  }),
})

export const {
  useGetRecordsByFilterQuery,
  useGetOrganizationNamesQuery,
  useGetRecordByRequestGuidQuery,
} = recordApi
export const getRecordsByFilterFulfilledMatcher =
  recordApi.endpoints.getRecordsByFilter.matchFulfilled
