import { useState, useCallback } from 'react'

const STORAGE_KEY = 'bead-puzzle-progress'

interface GameProgressData {
  version: number
  completedLevels: string[]
  unlockedUpTo: number
}

const DEFAULT_PROGRESS: GameProgressData = {
  version: 1,
  completedLevels: [],
  unlockedUpTo: 1,
}

function loadProgress(): GameProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROGRESS
    const data = JSON.parse(raw)
    if (data.version !== 1) return DEFAULT_PROGRESS
    return {
      version: 1,
      completedLevels: Array.isArray(data.completedLevels) ? data.completedLevels : [],
      unlockedUpTo: typeof data.unlockedUpTo === 'number' ? data.unlockedUpTo : 1,
    }
  } catch {
    return DEFAULT_PROGRESS
  }
}

function saveProgress(data: GameProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // silently fail if storage is full
  }
}

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgressData>(loadProgress)

  const isLevelUnlocked = useCallback((order: number): boolean => {
    return order <= progress.unlockedUpTo
  }, [progress.unlockedUpTo])

  const isLevelCompleted = useCallback((levelId: string): boolean => {
    return progress.completedLevels.includes(levelId)
  }, [progress.completedLevels])

  const markLevelComplete = useCallback((levelId: string, levelOrder: number) => {
    setProgress(prev => {
      const newCompleted = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId]
      const newUnlocked = Math.max(prev.unlockedUpTo, levelOrder + 1)
      const newData: GameProgressData = {
        ...prev,
        completedLevels: newCompleted,
        unlockedUpTo: newUnlocked,
      }
      saveProgress(newData)
      return newData
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS)
    saveProgress(DEFAULT_PROGRESS)
  }, [])

  return {
    completedLevels: progress.completedLevels,
    unlockedUpTo: progress.unlockedUpTo,
    isLevelUnlocked,
    isLevelCompleted,
    markLevelComplete,
    resetProgress,
  }
}
