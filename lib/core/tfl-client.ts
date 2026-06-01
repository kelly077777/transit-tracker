import type { Arrival, LineStatus, StopPoint } from './types'

const BASE = 'https://api.tfl.gov.uk'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`TfL API error: ${res.status} ${path}`)
  return res.json()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseArrival(raw: any): Arrival {
  return {
    id: raw.id || `${raw.vehicleId}-${raw.stationName}-${raw.expectedArrival}`,
    vehicleId: raw.vehicleId ?? 'unknown',
    stationName: raw.stationName ?? '',
    lineId: raw.lineId ?? '',
    lineName: raw.lineName ?? '',
    platformName: raw.platformName ?? '',
    towards: raw.towards ?? '',
    expectedArrival: raw.expectedArrival ?? '',
    timeToStation: raw.timeToStation ?? 0,
    currentLocation: raw.currentLocation ?? '',
    direction: raw.direction ?? '',
    destinationName: raw.destinationName ?? '',
    timestamp: Date.now(),
  }
}

export async function fetchLineArrivals(lineId: string): Promise<Arrival[]> {
  const raw = await get<unknown[]>(`/Line/${lineId}/Arrivals`)
  return raw.map(parseArrival).sort((a, b) => a.timeToStation - b.timeToStation)
}

export async function fetchStopArrivals(stopId: string): Promise<Arrival[]> {
  const raw = await get<unknown[]>(`/StopPoint/${stopId}/Arrivals`)
  return raw.map(parseArrival).sort((a, b) => a.timeToStation - b.timeToStation)
}

export async function fetchLineStatus(lineIds: string[]): Promise<LineStatus[]> {
  const joined = lineIds.join(',')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await get<any[]>(`/Line/${joined}/Status`)
  return raw.map((l) => {
    const status = l.lineStatuses?.[0] ?? {}
    return {
      id: l.id,
      name: l.name,
      modeName: l.modeName ?? 'tube',
      disruptions: l.disruptions?.map((d: { description: string }) => d.description) ?? [],
      severity: status.statusSeverity ?? 10,
      statusSeverityDescription: status.statusSeverityDescription ?? 'Good Service',
    }
  })
}

export async function fetchLineStops(lineId: string): Promise<StopPoint[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await get<any[]>(`/Line/${lineId}/StopPoints`)
  return raw.map((s) => ({
    id: s.id,
    name: s.commonName ?? s.name,
    lat: s.lat,
    lon: s.lon,
    lines: s.lines?.map((l: { id: string }) => l.id) ?? [],
  }))
}

export async function fetchAllLines(): Promise<{ id: string; name: string; modeName: string }[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await get<any[]>(`/Line/Mode/tube`)
  return raw.map((l) => ({ id: l.id, name: l.name, modeName: l.modeName }))
}
