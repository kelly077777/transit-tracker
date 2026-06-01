'use client'

import { useTransitStore } from '@/lib/core/store'
import { LINE_COLORS, LINE_NAMES } from '@/lib/core/types'
import styles from './LineSelector.module.css'

const LINES = [
  'victoria', 'central', 'jubilee', 'northern', 'piccadilly',
  'bakerloo', 'district', 'circle', 'metropolitan', 'hammersmith-city',
  'elizabeth', 'dlr',
]

export function LineSelector() {
  const selectedLine = useTransitStore((s) => s.selectedLine)
  const setSelectedLine = useTransitStore((s) => s.setSelectedLine)

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>SELECT LINE</p>
      <div className={styles.grid}>
        {LINES.map((id) => (
          <button
            key={id}
            className={`${styles.btn} ${selectedLine === id ? styles.active : ''}`}
            onClick={() => setSelectedLine(id)}
            style={selectedLine === id ? {
              borderColor: LINE_COLORS[id] ?? '#fff',
              color: LINE_COLORS[id] ?? '#fff',
            } : {}}
          >
            <span
              className={styles.dot}
              style={{ background: LINE_COLORS[id] ?? '#888' }}
            />
            {LINE_NAMES[id] ?? id}
          </button>
        ))}
      </div>
    </div>
  )
}
