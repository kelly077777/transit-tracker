import { create } from 'zustand'
import type { Arrival, LineStatus, StopPoint } from './types'

interface TransitState {
  selectedLine: string
  selectedStop: StopPoint | null
  arrivals: Arrival[]
  lineStatuses: LineStatus[]
  stops: StopPoint[]
  lastUpdated: number | null
  isLoading: boolean
  error: string | null
  setSelectedLine: (lineId: string) => void
  setSelectedStop: (stop: StopPoint | null) => void
  setArrivals: (arrivals: Arrival[]) => void
  setLineStatuses: (statuses: LineStatus[]) => void
  setStops: (stops: StopPoint[]) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
}

export const useTransitStore = create<TransitState>()((set) => ({
  selectedLine: 'victoria',
  selectedStop: null,
  arrivals: [],
  lineStatuses: [],
  stops: [],
  lastUpdated: null,
  isLoading: false,
  error: null,
  setSelectedLine: (lineId) => set({ selectedLine: lineId, selectedStop: null, arrivals: [], stops: [] }),
  setSelectedStop: (stop) => set({ selectedStop: stop }),
  setArrivals: (arrivals) => set({ arrivals, lastUpdated: Date.now() }),
  setLineStatuses: (statuses) => set({ lineStatuses: statuses }),
  setStops: (stops) => set({ stops }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),
}))
