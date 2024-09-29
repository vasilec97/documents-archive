import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./Loader.module.scss"
import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"

export const Loader = ({ className, ...props }: ComponentProps<typeof Loader2>) => {
  return <Loader2 className={cn(cls.Loader, {}, [className])} {...props} />
}
