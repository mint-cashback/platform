"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  const isDark = theme === "dark"
  
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative h-[28px] w-[56px] rounded-full p-1 transition-colors duration-300 ease-in-out ${
        isDark ? "bg-secondary" : "bg-secondary"
      }`}
      aria-label="Toggle theme"
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3" />
        ) : (
          <Sun className="h-3 w-3" />
        )}
      </span>
    </button>
  )
} 