import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./NotFoundPage.module.scss"

type NotFoundPageProps = {
  className?: string
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  return <div className={cn(cls.NotFoundPage, {}, [className])}>Страница не найдена</div>
}
