'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useTransitStore } from '../core/store'
import { fetchLineArrivals, fetchLineStatus, fetchLineStops } from '../core/tfl-client'

const TUBE_LINES = [
  'victoria', 'central', 'jubilee', 'northern', 'piccadilly',
  'bakerloo', 'district', 'circle', 'metropolitan', 'hammersmith-city',
]

const POLL_MS = 10_000

function jitter(ms: number) { return ms * (0.8 + Math.random() * 0.4) }

export function useTransitPoller() {
  const selectedLine = useTransitStore((s) => s.selectedLine)
  const setArrivals = useTransitStore((s) => s.setArrivals)
  const setLineStatuses = useTransitStore((s) => s.setLineStatuses)
  const setStops = useTransitStore((s) => s.setStops)
  const setLoading = useTransitStore((s) => s.setLoading)
  const setError = useTransitStore((s) => s.setError)

  const backoff = useRef(POLL_MS)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mounted = useRef(true)

  const poll = useCallback(async () => {
    if (!mounted.current) return
    setLoading(true)
    setError(null)
    try {
      const [arrivals, statuses, stops] = await Promise.all([
        fetchLineArrivals(selectedLine),
        fetchLineStatus(TUBE_LINES),
        fetchLineStops(selectedLine),
      ])
      if (!mounted.current) return
      setArrivals(arrivals)
      setLineStatuses(statuses)
      setStops(stops)
      backoff.current = POLL_MS
    } catch (err) {
      if (!mounted.current) return
      setError(err instanceof Error ? err.message : 'Network error')
      backoff.current = Math.min(backoff.current * 2, 60_000)
    } finally {
      if (mounted.current) setLoading(false)
    }
    if (mounted.current) timer.current = setTimeout(poll, jitter(backoff.current))
  }, [selectedLine, setArrivals, setLineStatuses, setStops, setLoading, setError])

  useEffect(() => {
    mounted.current = true
    backoff.current = POLL_MS
    poll()
    return () => {
      mounted.current = false
      if (timer.current) clearTimeout(timer.current)
    }
  }, [poll])
}
