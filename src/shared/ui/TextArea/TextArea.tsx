import { DetailedHTMLProps, TextareaHTMLAttributes, forwardRef, memo } from "react"
import cls from "./TextArea.module.scss"
import { cn } from "@/shared/lib/classNames/classNames"

type DefaultTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

type TextAreaProps = DefaultTextAreaProps & {
  error?: string
  title?: string
  withCounter?: boolean
  max?: boolean
}

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ id, value, title, className, maxLength = 200, error, withCounter, max, ...rest }, ref) => {
      const mods = {
        [cls.errorTextArea]: !!error,
        [cls.max]: max,
      }

      return (
        <div className={cls.textAreaWrapper}>
          <label htmlFor={id} className={cls.label}>
            {title}
          </label>
          <textarea
            id={id}
            ref={ref}
            value={value}
            className={cn(cls.textArea, mods, [className])}
            maxLength={maxLength}
            {...rest}
          />
          {withCounter && (
            <div className={cls.counter}>
              {(value as string)?.length || 0}/{maxLength}
            </div>
          )}
          {!!error && <span className={cls.textAreaError}>{error}</span>}
        </div>
      )
    }
  )
)

TextArea.displayName = "TextArea"
