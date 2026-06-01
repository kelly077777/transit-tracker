'use client'

import { useTransitStore } from '@/lib/core/store'
import { LINE_COLORS } from '@/lib/core/types'
import styles from './ArrivalsFeed.module.css'

function formatMins(seconds: number): string {
  if (seconds < 30) return 'Due'
  const m = Math.floor(seconds / 60)
  return m === 0 ? 'Due' : `${m} min`
}

export function ArrivalsFeed() {
  const selectedLine = useTransitStore((s) => s.selectedLine)
  const arrivals = useTransitStore((s) => s.arrivals)
  const isLoading = useTransitStore((s) => s.isLoading)
  const color = LINE_COLORS[selectedLine] ?? '#888'
  const shown = arrivals.slice(0, 25)

  if (isLoading && shown.length === 0) {
    return <div className={styles.empty}><span className={styles.loader}>FETCHING ARRIVALS...</span></div>
  }
  if (shown.length === 0) {
    return <div className={styles.empty}><span className={styles.noData}>NO ARRIVAL DATA</span><p>This line may not be operating right now.</p></div>
  }

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <span>STATION</span><span>TOWARDS</span><span>LOCATION</span><span className={styles.right}>ETA</span>
      </div>
      <div className={styles.rows}>
        {shown.map((a) => {
          const isDue = a.timeToStation < 60
          return (
            <div key={a.id} className={`${styles.row} ${isDue ? styles.due : ''}`}>
              <span className={styles.station}>{a.stationName}</span>
              <span className={styles.towards}>{a.towards || a.destinationName}</span>
              <span className={styles.location}>{a.currentLocation || '—'}</span>
              <span className={styles.eta} style={isDue ? { color } : undefined}>{formatMins(a.timeToStation)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
