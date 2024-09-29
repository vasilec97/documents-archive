import { HStack } from "@/shared/ui/Stack"
import cls from "./PageLoader.module.scss"
import { Loader } from "@/shared/ui/Loader/Loader"

export const PageLoader = () => {
  return (
    <HStack className={cls.PageLoader} align="center" justify="center" max>
      <Loader className={cls.icon} />
    </HStack>
  )
}
