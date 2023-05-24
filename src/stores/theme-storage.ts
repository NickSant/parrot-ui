import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeType = {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export const useTheme = create(
  persist<ThemeType>((set) => ({
      theme: 'dark',
      toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }))
    }), 
    {
      name: '@parrot-theme'
    }
  )
)