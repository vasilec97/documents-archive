import { RecordDetailsPage } from "@/pages/RecordDetailsPage/RecordDetailsPage"
import { RecordsPage } from "@/pages/RecordsPage/RecordsPage"
import {
  AppRoutes,
  getRouteRecordDetails,
  getRouteRecords,
  getRouteRequestCreate,
  getRouteRequestDetails,
  getRouteRequestEdit,
  getRouteRequests,
} from "@/shared/const/router"
import { RouteObject, createBrowserRouter } from "react-router-dom"
import { RequestsPage } from "@/pages/RequestsPage/RequestsPage"
import { RequestCreatePage } from "@/pages/RequestCreatePage/RequestCreatePage"
import { RequestEditPage } from "@/pages/RequestEditPage/RequestEditPage"
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage"
import { RootLayout } from "@/app/layouts/RootLayout/RootLayout"
import { RequestDetailsPage } from "@/pages/RequestDetailsPage"

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.RECORDS]: {
    path: getRouteRecords(),
    element: <RecordsPage />,
  },
  [AppRoutes.RECORD_DETAILS]: {
    path: getRouteRecordDetails(":guid"),
    element: <RecordDetailsPage />,
  },
  [AppRoutes.REQUESTS]: {
    index: true,
    element: <RequestsPage />,
  },
  [AppRoutes.REQUEST_DETAILS]: {
    path: getRouteRequestDetails(":guid"),
    element: <RequestDetailsPage />,
  },
  [AppRoutes.REQUEST_CREATE]: {
    path: getRouteRequestCreate(),
    element: <RequestCreatePage />,
  },
  [AppRoutes.REQUEST_EDIT]: {
    path: getRouteRequestEdit(":guid"),
    element: <RequestEditPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
}

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: Object.values(routeConfig),
    },
  ])
}
