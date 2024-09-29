import { Hourglass, CircleCheck, X } from "lucide-react"
import { DocumentTypeMap, QuickNavigationMap, RecordStatusMap, TaxPeriodMap } from "../types/types"

export const recordStatuses: RecordStatusMap[] = [
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
  {
    value: "REJECTED",
    label: "Отклонена",
    icon: <X width={16} height={16} color="var(--danger-color-foreground)" />,
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

export const taxPeriods: TaxPeriodMap[] = [
  {
    value: "ALL",
    label: "Все",
  },
  {
    value: "PERIOD_MONTH",
    label: "Месяц",
  },
  {
    value: "PERIOD_Q1",
    label: "1 квартал",
  },
  {
    value: "PERIOD_Q2",
    label: "2 квартал",
  },
  {
    value: "PERIOD_Q3",
    label: "3 квартал",
  },
  {
    value: "PERIOD_Q4",
    label: "4 квартал",
  },
  {
    value: "PERIOD_YEAR",
    label: "Год",
  },
]

export const documentTypes: DocumentTypeMap[] = [
  {
    value: "ALL",
    label: "Все",
  },
  {
    value: "IN",
    label: "Входящий",
  },
  {
    value: "OUT",
    label: "Исходящий",
  },
]
