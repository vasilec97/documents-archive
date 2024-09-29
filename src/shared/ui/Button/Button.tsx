import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from "react"
import { cn, Mods } from "@/shared/lib/classNames/classNames"
import cls from "./Button.module.scss"
import { Loader } from "@/shared/ui/Loader/Loader"

export type ButtonVariant = "outline"
export type ButtonColor = "primary" | "secondary" | "success" | "danger"
export type ButtonSize = "m" | "l" | "xl"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: ButtonVariant
  disabled?: boolean
  children?: ReactNode
  fullWidth?: boolean
  color?: ButtonColor
  size?: ButtonSize
  addonLeft?: ReactNode
  addonRight?: ReactNode
  isLoading?: boolean
}

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    className,
    children,
    variant = "outline",
    disabled,
    fullWidth,
    addonLeft,
    addonRight,
    isLoading,
    size = "m",
    color = "primary",
    ...otherProps
  } = props

  const mods: Mods = {
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
    [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
  }

  return (
    <button
      type="button"
      className={cn(cls.Button, mods, [className, cls[variant], cls[color], cls[size]])}
      disabled={disabled}
      {...otherProps}
      ref={ref}
    >
      {isLoading && (
        <div className={cls.addonLeft}>
          <Loader />
        </div>
      )}
      <div className={cls.addonLeft}>{addonLeft}</div>
      {children}
      <div className={cls.addonRight}>{addonRight}</div>
    </button>
  )
})
