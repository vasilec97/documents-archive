import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/app/styles/index.scss"
import { AppRouter } from "@/app/providers/Router/ui/AppRouter.tsx"
import { StoreProvider } from "@/app/providers/StoreProvider/ui/StoreProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  </StrictMode>
)
