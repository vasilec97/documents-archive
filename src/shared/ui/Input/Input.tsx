"use client"

import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react"
import cls from "./Input.module.scss"
import { cn } from "@/shared/lib/classNames/classNames"

export type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputPropsType = DefaultInputPropsType & {
  error?: string
  title?: string
  full?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  const { error, className, title, full, id, type = "text", ...rest } = props

  const wrapperMods = {
    [cls.max]: full,
  }
  const inputMods = {
    [cls.errorInput]: !!error,
  }

  return (
    <div className={cn(cls.inputWrapper, wrapperMods, [className])}>
      {title && <label htmlFor={id}>{title}</label>}
      <input id={id} ref={ref} type={type} className={cn(cls.input, inputMods)} {...rest} />
      {error && (
        <div className={cls.errorBlock}>
          <span className={`${cls.error}`}>{error}</span>
        </div>
      )}
    </div>
  )
})

Input.displayName = "Input"
