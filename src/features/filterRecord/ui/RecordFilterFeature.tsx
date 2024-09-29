import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./RecordFilterFeature.module.scss"
import { RecordFilter } from "../types/types"
import { HStack, VStack } from "@/shared/ui/Stack"
import { Button } from "@/shared/ui/Button/Button"
import { Select, SelectItem } from "@/shared/ui/Select/Select"
import { documentTypes, quickNavigations, recordStatuses, taxPeriods } from "../const/filter"
import { toSnakeCase } from "@/shared/utils/toSnakeCase"
import { ChevronDown } from "lucide-react"
import { useRecordFilter } from "../libs/hooks/useRecordFilter"
import DatePicker from "react-datepicker"
import { setFilter } from "../model/slice/recordFilterSlice"
import { CalendarDays as CalendarIcon } from "lucide-react"
import { useDatepicker } from "@/shared/lib/hooks/useDatepicker/useDatepicker"
import { Input } from "@/shared/ui/Input/Input"

interface RecordFilterProps {
  className?: string
  filter: RecordFilter
  isDirty: boolean
  organizationNames?: string[]
}

export const RecordFilterFeature = ({
  className,
  filter,
  organizationNames,
  isDirty,
}: RecordFilterProps) => {
  const {
    open,
    search,
    handleSearchChange,
    toggleFilter,
    handleStatusChange,
    handleQuickNavigationClick,
    handleTaxPeriodChange,
    handleDocumentTypeChange,
    handleOrganizationNameChange,
    handleClearClick,
  } = useRecordFilter()

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
    <article className={cn(cls.RecordFilterFeature, filterMods, [className])}>
      <HStack justify="between" align="center" max>
        <HStack gap="8" align="center" justify="between" max>
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
              {recordStatuses.map(({ value, label, icon }) => {
                const mods = {
                  [cls.filled]: value == filter.recordStatus,
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
          <VStack gap="8">
            <p className={cls.label}>Налоговый период</p>
            <Select value={filter.taxPeriod} sideOffset={5} onValueChange={handleTaxPeriodChange}>
              {taxPeriods.map(({ value, label }) => {
                return (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                )
              })}
            </Select>
          </VStack>
          <VStack gap="8">
            <p className={cls.label}>Вид документа</p>
            <Select
              value={filter.documentType}
              sideOffset={5}
              onValueChange={handleDocumentTypeChange}
            >
              {documentTypes.map(({ value, label }) => {
                return (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                )
              })}
            </Select>
          </VStack>
          <VStack gap="8">
            <p className={cls.label}>Имя организации</p>
            <Select
              defaultValue="ALL"
              value={filter?.organizationName}
              sideOffset={5}
              onValueChange={handleOrganizationNameChange}
            >
              <SelectItem key="ALL" value="ALL">
                Все
              </SelectItem>
              {organizationNames?.map((name) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                )
              })}
            </Select>
          </VStack>
        </HStack>
      )}
    </article>
  )
}
