import { AppRoutes } from "./main/routes/routes"
import { GlobalModal } from "./presentation/contexts/globalModalContext"
import { useTheme } from "./stores/theme-storage"

function App() {
  const theme = useTheme(state => state.theme)
  
  return (
    <div className={theme}>
      <GlobalModal>
        <AppRoutes />
      </GlobalModal>
    </div>
  )
}

export default App
