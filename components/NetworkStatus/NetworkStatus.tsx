'use client'

import { useTransitStore } from '@/lib/core/store'
import { LINE_COLORS } from '@/lib/core/types'
import styles from './NetworkStatus.module.css'

export function NetworkStatus() {
  const lineStatuses = useTransitStore((s) => s.lineStatuses)

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.label}>NETWORK STATUS</span>
      </div>
      <div className={styles.list}>
        {lineStatuses.length === 0 ? (
          <p className={styles.loading}>LOADING...</p>
        ) : (
          lineStatuses.map((line) => {
            const isGood = line.severity >= 10
            const isBad = line.severity <= 5
            return (
              <div key={line.id} className={styles.row}>
                <span
                  className={styles.dot}
                  style={{ background: LINE_COLORS[line.id] ?? '#888' }}
                />
                <span className={styles.name}>{line.name}</span>
                <span
                  className={`${styles.status} ${
                    isGood ? styles.good : isBad ? styles.bad : styles.warn
                  }`}
                >
                  {isGood ? '●' : isBad ? '▲' : '◆'}
                </span>
              </div>
            )
          })
        )}
      </div>
      <div className={styles.legend}>
        <span className={styles.good}>● Good</span>
        <span className={styles.warn}>◆ Minor</span>
        <span className={styles.bad}>▲ Severe</span>
      </div>
    </div>
  )
}
