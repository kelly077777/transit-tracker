'use client'

import { useTransitStore } from '@/lib/core/store'
import { useStopArrivals } from '@/lib/hooks/useStopArrivals'
import styles from './StopsPanel.module.css'

function formatMins(seconds: number): string {
  if (seconds < 30) return 'Due'
  return `${Math.floor(seconds / 60)}m`
}

function StopArrivalsPanel({ stopId }: { stopId: string }) {
  const { arrivals, loading } = useStopArrivals(stopId)

  if (loading && arrivals.length === 0)
    return <p className={styles.micro}>Loading...</p>

  if (arrivals.length === 0)
    return <p className={styles.micro}>No arrivals</p>

  return (
    <div className={styles.stopArrivals}>
      {arrivals.slice(0, 6).map((a) => (
        <div key={a.id} className={styles.stopArrival}>
          <span className={styles.dest}>{a.towards || a.destinationName}</span>
          <span className={styles.stopEta}>{formatMins(a.timeToStation)}</span>
        </div>
      ))}
    </div>
  )
}

export function StopsPanel() {
  const stops = useTransitStore((s) => s.stops)
  const selectedStop = useTransitStore((s) => s.selectedStop)
  const setSelectedStop = useTransitStore((s) => s.setSelectedStop)

  if (stops.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.label}>STOPS</span>
        <p>Select a line to see stops</p>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.label}>STOPS</span>
        <span className={styles.count}>{stops.length}</span>
      </div>
      <div className={styles.list}>
        {stops.map((stop) => {
          const isSelected = selectedStop?.id === stop.id
          return (
            <button
              key={stop.id}
              className={`${styles.stop} ${isSelected ? styles.selected : ''}`}
              onClick={() => setSelectedStop(isSelected ? null : stop)}
            >
              <span className={styles.stopName}>{stop.name}</span>
              {isSelected && <StopArrivalsPanel stopId={stop.id} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
