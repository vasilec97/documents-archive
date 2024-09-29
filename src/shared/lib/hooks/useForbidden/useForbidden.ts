import { getRouteRequests } from "@/shared/const/router"
import { useNavigate } from "react-router-dom"

type Params = {
  condition: boolean
}

export const useForbidden = ({ condition }: Params) => {
  const navigate = useNavigate()

  if (condition) navigate(getRouteRequests())
}
