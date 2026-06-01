export interface Arrival {
  id: string
  vehicleId: string
  stationName: string
  lineId: string
  lineName: string
  platformName: string
  towards: string
  expectedArrival: string
  timeToStation: number
  currentLocation: string
  direction: string
  destinationName: string
  timestamp: number
}

export interface LineStatus {
  id: string
  name: string
  modeName: string
  disruptions: string[]
  severity: number
  statusSeverityDescription: string
}

export interface StopPoint {
  id: string
  name: string
  lat: number
  lon: number
  lines: string[]
}

export interface VehiclePosition {
  vehicleId: string
  lat: number
  lon: number
  lineId: string
  towards: string
  currentLocation: string
  timestamp: number
}

export type LineId =
  | 'bakerloo'
  | 'central'
  | 'circle'
  | 'district'
  | 'hammersmith-city'
  | 'jubilee'
  | 'metropolitan'
  | 'northern'
  | 'piccadilly'
  | 'victoria'
  | 'waterloo-city'

export const LINE_COLORS: Record<string, string> = {
  bakerloo: '#B36305',
  central: '#E32017',
  circle: '#FFD300',
  district: '#00782A',
  'hammersmith-city': '#F3A9BB',
  jubilee: '#A0A5A9',
  metropolitan: '#9B0056',
  northern: '#000000',
  piccadilly: '#003688',
  victoria: '#0098D4',
  'waterloo-city': '#95CDBA',
  elizabeth: '#6950A1',
  dlr: '#00A4A7',
  overground: '#EE7C0E',
}

export const LINE_NAMES: Record<string, string> = {
  bakerloo: 'Bakerloo',
  central: 'Central',
  circle: 'Circle',
  district: 'District',
  'hammersmith-city': 'Hammersmith & City',
  jubilee: 'Jubilee',
  metropolitan: 'Metropolitan',
  northern: 'Northern',
  piccadilly: 'Piccadilly',
  victoria: 'Victoria',
  'waterloo-city': 'Waterloo & City',
  elizabeth: 'Elizabeth',
  dlr: 'DLR',
  overground: 'Overground',
}
