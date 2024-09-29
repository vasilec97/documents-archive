import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./PageTitle.module.scss"
import { ReactNode, memo } from "react"

interface PageTitleProps {
  className?: string
  children: ReactNode
}

export const PageTitle = memo(({ className, children }: PageTitleProps) => {
  return <h1 className={cn(cls.PageTitle, {}, [className])}>{children}</h1>
})

PageTitle.displayName = "PageTitle"
