'use client'

import { useTransitPoller } from '@/lib/hooks/useTransitPoller'
import { LineSelector } from '@/components/LineSelector/LineSelector'
import { StatusBar } from '@/components/StatusBar/StatusBar'
import { ArrivalsFeed } from '@/components/ArrivalsFeed/ArrivalsFeed'
import { StopsPanel } from '@/components/StopsPanel/StopsPanel'
import { NetworkStatus } from '@/components/NetworkStatus/NetworkStatus'
import styles from './Dashboard.module.css'

export function Dashboard() {
  useTransitPoller()

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>TfL</span>
          <span className={styles.logoSub}>LIVE TRACKER</span>
        </div>
        <LineSelector />
      </header>

      <StatusBar />

      <main className={styles.main}>
        <section className={styles.stops}>
          <StopsPanel />
        </section>

        <section className={styles.feed}>
          <div className={styles.feedHeader}>
            <span className={styles.sectionLabel}>LIVE ARRIVALS</span>
          </div>
          <ArrivalsFeed />
        </section>

        <section className={styles.network}>
          <NetworkStatus />
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Powered by TfL Open Data API</span>
        <span>Polling every 10s · Buffer flush on rAF · Zustand slice subscriptions</span>
      </footer>
    </div>
  )
}
