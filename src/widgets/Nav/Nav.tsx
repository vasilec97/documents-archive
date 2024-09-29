import { cn } from "@/shared/lib/classNames/classNames"
import cls from "./Nav.module.scss"
import { NavLink } from "react-router-dom"
import { getRouteRecords, getRouteRequestCreate, getRouteRequests } from "@/shared/const/router"

interface NavProps {
  className?: string
}

export const Nav = ({ className }: NavProps) => {
  const linkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? cls.active : "")

  return (
    <div className={cls.navWrapper}>
      <ul className={cn(cls.nav, {}, [className, "app-container"])}>
        <li className={cls.linkItem}>
          <NavLink className={linkClassName} to={getRouteRequests()}>
            Архив заявок
          </NavLink>
        </li>
        <li className={cls.linkItem}>
          <NavLink className={linkClassName} to={getRouteRecords()}>
            Архив документов
          </NavLink>
        </li>
        <li className={cls.linkItem}>
          <NavLink className={linkClassName} to={getRouteRequestCreate()}>
            Создать заявку
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
