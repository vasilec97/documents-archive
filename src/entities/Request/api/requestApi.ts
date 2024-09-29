import { CreateRequestType, RequestAll, RequestResponse, RequestType } from "../types/types"
import { rtkApi } from "@/shared/api/rtkApi"
import { getConditionsQueryParams } from "../utils/getConditionsQueryParams"
import { REQUESTS, REQUEST_BY_ID } from "@/shared/const/endpoints"
import { REQUEST_TAG } from "@/shared/const/tags"

export const requestApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequestsByFilter: builder.query<RequestResponse, RequestAll>({
      query: (data) => {
        const conditionsQp = getConditionsQueryParams(data.filter)

        const paginationQp = new URLSearchParams({
          _page: String(data?.pagination?._page || "1"),
          _per_page: String(data?.pagination?._per_page || "30"),
          _sort: "request_date",
          _order: data?.pagination?._order || "desc",
        })

        return `${REQUESTS}?${conditionsQp}&${paginationQp}`
      },
      transformResponse(response, meta) {
        return {
          data: response as RequestType[],
          totalCount: Number(meta?.response?.headers.get("X-Total-Count")),
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(
                ({ request_guid }) =>
                  ({
                    type: REQUEST_TAG,
                    id: request_guid,
                  } as const)
              ),
              { type: REQUEST_TAG, id: "LIST" },
            ]
          : [{ type: REQUEST_TAG, id: "LIST" }],
    }),
    getRequestByGuid: builder.query<RequestType[], string>({
      query: (guid) => `${REQUESTS}?request_guid=${guid}`,
      providesTags: (result, error, arg) => [{ type: REQUEST_TAG, id: arg }],
    }),
    createRequest: builder.mutation<void, CreateRequestType>({
      query: (body) => ({
        method: "POST",
        url: REQUESTS,
        body,
      }),
      invalidatesTags: [{ type: REQUEST_TAG, id: "LIST" }],
    }),
    updateRequest: builder.mutation<
      void,
      Omit<RequestType, "request_date" | "request_processed" | "id">
    >({
      query: (params) => {
        const { request_guid, ...body } = params

        return {
          method: "PATCH",
          url: REQUEST_BY_ID(request_guid),
          body,
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: REQUEST_TAG, id: arg.request_guid },
        { type: REQUEST_TAG, id: "LIST" },
      ],
    }),
    deleteRequestByGuid: builder.mutation<void, string>({
      query: (guid) => ({
        method: "DELETE",
        url: REQUEST_BY_ID(guid),
      }),
      invalidatesTags: (result, err, arg) => [
        { type: REQUEST_TAG, id: arg },
        { type: REQUEST_TAG, id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetRequestsByFilterQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useGetRequestByGuidQuery,
  useDeleteRequestByGuidMutation,
} = requestApi
export const getRequestsByFilterFulfilledMatcher =
  requestApi.endpoints.getRequestsByFilter.matchFulfilled
