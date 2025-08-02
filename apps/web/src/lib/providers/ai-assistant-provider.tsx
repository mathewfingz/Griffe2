'use client'

import { createContext, useContext, useState } from 'react'

interface AIAssistantContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined)

interface AIAssistantProviderProps {
  children: React.ReactNode
}

export function AIAssistantProvider({ children }: AIAssistantProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AIAssistantContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AIAssistantContext.Provider>
  )
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext)
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider')
  }
  return context
}