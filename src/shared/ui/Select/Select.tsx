import React, { ComponentProps, HTMLAttributes, ReactNode } from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check as CheckIcon } from "lucide-react"
import { ChevronDown as ArrowDown } from "lucide-react"
import cls from "./Select.module.scss"
import { cn } from "@/shared/lib/classNames/classNames"

type SelectProps = ComponentProps<typeof SelectPrimitive.Root> &
  ComponentProps<typeof SelectPrimitive.Content> & {
    placeholderText?: ReactNode
    triggerClassName?: string
    valueClassName?: string
    arrowDownIconClassName?: string
    contentClassName?: string
    portalContainer?: HTMLElement | null
  }

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      children,
      sideOffset,
      placeholderText,
      triggerClassName,
      valueClassName,
      arrowDownIconClassName,
      contentClassName,
      side,
      position = "popper",
      portalContainer,
      ...rest
    },
    forwardedRef
  ) => {
    return (
      <SelectPrimitive.Root {...rest}>
        <SelectPrimitive.Trigger
          ref={forwardedRef}
          className={cn(cls.SelectTrigger, {}, [triggerClassName])}
        >
          <SelectPrimitive.Value
            placeholder={placeholderText}
            className={cn(cls.SelectValue, {}, [valueClassName])}
          />
          <SelectPrimitive.Icon className={cn(cls.SelectIcon, {}, [arrowDownIconClassName])}>
            <ArrowDown width={16} height={16} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <>
            <SelectPrimitive.Content
              side={side}
              sideOffset={sideOffset}
              position={position}
              className={cn(cls.SelectContent, {}, [contentClassName])}
            >
              <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  }
)

Select.displayName = "Select"

type SelectItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string
  disabled?: boolean
  textValue?: string
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...rest }, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        ref={forwardedRef}
        className={cn(cls.SelectItem, {}, [className])}
        {...rest}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon width={16} height={16} className={cls.CheckIcon} />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    )
  }
)

SelectItem.displayName = "SelectItem"
