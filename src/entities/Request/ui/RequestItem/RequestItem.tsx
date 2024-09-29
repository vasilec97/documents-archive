import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RequestItem.module.scss"
import { RequestType } from "../../types/types"
import { formatDate } from "@/shared/lib/dateFormatter/dateFormatter"
import { Hourglass, CircleCheck } from "lucide-react"
import { formatComment } from "@/shared/utils/formatComment"
import { useNavigate } from "react-router-dom"
import { getRouteRequestDetails } from "@/shared/const/router"
import { MouseEvent } from "react"

interface RequestItemProps {
  className?: string
  request: RequestType
  statusAction: (date: string) => (e: MouseEvent<SVGSVGElement>) => void
}

export const RequestItem = ({ className, request, statusAction }: RequestItemProps) => {
  const navigate = useNavigate()

  const formattedComment = formatComment(request.request_comment)

  const navigateToDetails = () => {
    navigate(getRouteRequestDetails(request.request_guid))
  }

  return (
    <tr className={cn(cls.RequestItem, {}, [className])} onClick={navigateToDetails}>
      <td>{formatDate(request.request_date)}</td>
      <td className={cls.iconCell}>
        {!request.request_processed ? (
          <Hourglass className={cn(cls.icon, {}, [cls.hourglass])} />
        ) : (
          <CircleCheck
            onClick={statusAction(request.request_guid)}
            className={cn(cls.icon, {}, [cls.circle])}
          />
        )}
      </td>
      <td>{formattedComment}</td>
    </tr>
  )
}
