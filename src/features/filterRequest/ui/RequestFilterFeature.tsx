import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RequestFilterFeature.module.scss"
import { RequestFilter } from "../types/types"
import { HStack, VStack } from "@/shared/ui/Stack"
import { Button } from "@/shared/ui/Button/Button"
import { quickNavigations, requestStatuses } from "../const/filter"
import { toSnakeCase } from "@/shared/utils/toSnakeCase"
import { ChevronDown } from "lucide-react"
import { useRequestFilter } from "../libs/hooks/useRequestFilter"
import { useDatepicker } from "../../../shared/lib/hooks/useDatepicker/useDatepicker"
import DatePicker from "react-datepicker"
import { setFilter } from "../model/slice/requestFilterSlice"
import { CalendarDays as CalendarIcon } from "lucide-react"
import { memo } from "react"
import { Input } from "@/shared/ui/Input/Input"

interface RequestFilterProps {
  className?: string
  filter: RequestFilter
  isDirty: boolean
}

export const RequestFilterFeature = memo(({ className, filter, isDirty }: RequestFilterProps) => {
  const {
    open,
    search,
    handleSearchChange,
    toggleFilter,
    handleStatusChange,
    handleQuickNavigationClick,
    handleClearClick,
  } = useRequestFilter()

  const startDate = filter.startDate ? new Date(filter.startDate) : undefined
  const endDate = filter.endDate ? new Date(filter.endDate) : undefined

  const { onStartDateChange, onEndDateChange } = useDatepicker({
    action: setFilter,
    endDate,
  })

  const filterMods = {
    [cls.active]: open,
  }

  return (
    <article className={cn(cls.RequestFilterFeature, filterMods, [className])}>
      <HStack justify="between" align="center" max>
        <HStack gap="8" justify="between" align="center" max>
          <HStack gap="8" align="center">
            <HStack align="center" gap="8" className={cls.titleField} onClick={toggleFilter}>
              <h2 className={cls.title}>Фильтр</h2>
              <ChevronDown className={cls.icon} width={16} height={16} />
            </HStack>
            {isDirty && (
              <Button color="secondary" onClick={handleClearClick}>
                Очистить
              </Button>
            )}
          </HStack>
          {open && (
            <Input
              className={cls.searchInput}
              value={search}
              onChange={handleSearchChange}
              placeholder="Поиск..."
            />
          )}
        </HStack>
      </HStack>
      {open && (
        <HStack align="start" gap="32" wrap="wrap" max>
          <VStack gap="8">
            <p className={cls.label}>Период</p>
            <HStack align="center" gap="8">
              <HStack className={cls.datepicker}>
                <DatePicker
                  selected={startDate}
                  placeholderText="Начальная дата"
                  onChange={onStartDateChange}
                />
                <CalendarIcon className={cls.calendarIcon} width={16} height={16} />
              </HStack>
              <span className={cls.separator}></span>
              <HStack className={cls.datepicker}>
                <DatePicker
                  selected={endDate}
                  minDate={startDate}
                  placeholderText="Конечная дата"
                  onChange={onEndDateChange}
                  disabled={!filter.startDate}
                />
                <CalendarIcon className={cls.calendarIcon} width={16} height={16} />
              </HStack>
            </HStack>
          </VStack>
          <VStack gap="8">
            <p className={cls.label}>Быстрый переход</p>
            <HStack align="center" gap="8">
              {quickNavigations.map(({ value, label }) => {
                const mods = {
                  [cls.filled]: value == filter.quickNavigation,
                }

                return (
                  <Button
                    key={value}
                    className={cn(cls.quickNavigationBtn, mods)}
                    variant="outline"
                    color="secondary"
                    onClick={handleQuickNavigationClick(value)}
                  >
                    {label}
                  </Button>
                )
              })}
            </HStack>
          </VStack>
          <VStack gap="8">
            <p className={cls.label}>Статус заявки</p>
            <HStack align="center" gap="8">
              {requestStatuses.map(({ value, label, icon }) => {
                const mods = {
                  [cls.filled]: value == filter.requestStatus,
                }

                return (
                  <Button
                    key={value as string}
                    className={cn(cls.statusBtn, mods, [cls[toSnakeCase(value as string)]])}
                    onClick={handleStatusChange(value)}
                    addonLeft={icon}
                  >
                    {label}
                  </Button>
                )
              })}
            </HStack>
          </VStack>
        </HStack>
      )}
    </article>
  )
})

RequestFilterFeature.displayName = "RequestFilterFeature"
