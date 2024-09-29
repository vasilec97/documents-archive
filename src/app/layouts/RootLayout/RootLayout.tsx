import { cn } from "@/shared/lib/classNames/classNames"
import { Nav } from "@/widgets/Nav/Nav"
import { Outlet } from "react-router-dom"
import cls from "./RootLayout.module.scss"

export const RootLayout = () => {
  return (
    <main className={cn(cls.RootLayout, {}, ["app"])}>
      <Nav />
      <div className="app-container">
        <Outlet />
      </div>
    </main>
  )
}
