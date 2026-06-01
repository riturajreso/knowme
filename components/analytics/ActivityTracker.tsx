'use client'

import { useEffect } from 'react'

interface ActivityTrackerProps {
  type: string
  path: string
  postSlug?: string
}

export function ActivityTracker({ type, path, postSlug }: ActivityTrackerProps) {
  useEffect(() => {
    const key = `activity:${type}:${path}:${postSlug ?? ''}`
    if (sessionStorage.getItem(key)) {
      return
    }

    sessionStorage.setItem(key, '1')

    void fetch('/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, path, postSlug })
    })
  }, [type, path, postSlug])

  return null
}
