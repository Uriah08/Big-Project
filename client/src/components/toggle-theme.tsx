"use client"

import React from 'react'
import { Button } from './ui/button'
import { Sun, Moon } from 'lucide-react'

import { useTheme } from 'next-themes'

const ToggleTheme = () => {

    const { theme, setTheme } = useTheme()

    const handleToggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

  return (
    <Button className='border-none hover:bg-#141414' onClick={handleToggleTheme} variant="outline" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export default ToggleTheme