import { Hourglass, CircleCheck } from "lucide-react"
import { QuickNavigationMap, RequestStatusMap } from "../types/types"

export const requestStatuses: RequestStatusMap[] = [
  {
    value: "IN_PROCESS",
    label: "В обработке",
    icon: <Hourglass width={16} height={16} color="var(--primary-color-foreground)" />,
  },
  {
    value: "FINISHED",
    label: "Обработана",
    icon: <CircleCheck width={16} height={16} color="var(--secondary-color-foreground)" />,
  },
]

export const quickNavigations: QuickNavigationMap[] = [
  {
    value: "TODAY",
    label: "Сегодня",
  },
  {
    value: "WEEK",
    label: "Неделя",
  },
  {
    value: "MONTH",
    label: "Месяц",
  },
]
