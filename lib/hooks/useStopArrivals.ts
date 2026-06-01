'use client'

import { useEffect, useState } from 'react'
import { fetchStopArrivals } from '../core/tfl-client'
import type { Arrival } from '../core/types'

export function useStopArrivals(stopId: string | null) {
  const [arrivals, setArrivals] = useState<Arrival[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!stopId) { setArrivals([]); return }

    let active = true
    let timer: ReturnType<typeof setTimeout>

    async function fetch() {
      setLoading(true)
      try {
        const data = await fetchStopArrivals(stopId!)
        if (active) setArrivals(data.slice(0, 10))
      } catch {
        // silently retry
      } finally {
        if (active) setLoading(false)
        timer = setTimeout(fetch, 15_000)
      }
    }

    fetch()
    return () => { active = false; clearTimeout(timer) }
  }, [stopId])

  return { arrivals, loading }
}
