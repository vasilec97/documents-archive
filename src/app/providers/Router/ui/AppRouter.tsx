import { RouterProvider } from "react-router-dom"
import { createAppRouter } from "../config/routerConfig"

export const AppRouter = () => {
  const router = createAppRouter()

  return <RouterProvider router={router} />
}