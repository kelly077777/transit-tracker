'use client'

import { useTransitStore } from '@/lib/core/store'
import { LINE_COLORS } from '@/lib/core/types'
import styles from './StatusBar.module.css'

function formatTime(ts: number | null): string {
  if (!ts) return '--:--:--'
  return new Date(ts).toLocaleTimeString('en-GB', { hour12: false })
}

export function StatusBar() {
  const selectedLine = useTransitStore((s) => s.selectedLine)
  const status = useTransitStore((s) => s.lineStatuses.find((l) => l.id === selectedLine))
  const lastUpdated = useTransitStore((s) => s.lastUpdated)
  const isLoading = useTransitStore((s) => s.isLoading)
  const error = useTransitStore((s) => s.error)

  const lineColor = LINE_COLORS[selectedLine] ?? '#888'
  const severity = status?.severity ?? 10
  const isGood = severity >= 10
  const isDisrupted = severity <= 5

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.lineDot} style={{ background: lineColor }} />
        <span className={styles.lineName}>{status?.name ?? selectedLine.toUpperCase()}</span>
        <span
          className={`${styles.statusPill} ${isGood ? styles.good : isDisrupted ? styles.bad : styles.warn}`}
        >
          {status?.statusSeverityDescription ?? 'Loading...'}
        </span>
        {error && <span className={styles.error}>⚠ {error}</span>}
      </div>
      <div className={styles.right}>
        {isLoading && <span className={styles.pulse}>POLLING</span>}
        <span className={styles.clock}>
          UPDATED {formatTime(lastUpdated)}
        </span>
      </div>
    </div>
  )
}
