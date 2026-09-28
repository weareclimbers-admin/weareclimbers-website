// Déclaration de types locale pour @boxtal/parcel-point-map (v0.0.9) : le package
// n'expose pas ses typings via son champ `exports` → tsc ne les résout pas. On
// redéclare ici le sous-ensemble d'API qu'on utilise (carte de points relais Shop2Shop).
declare module '@boxtal/parcel-point-map' {
  export interface Address {
    country: string
    zipCode: string
    city: string
    street?: string
  }

  export type Location = Address & {
    position: { latitude: number; longitude: number }
  }

  export interface ParcelPoint {
    code: string
    name: string
    network: string
    location: Location
    openingDays: unknown[]
  }

  export interface ParcelPointAndDistance {
    distanceFromSearchLocation: number
    parcelPoint: ParcelPoint
  }

  export interface ParcelPointNetwork {
    code: string
    markerTemplate?: { anchor: string; element?: HTMLElement | null; color?: string }
  }

  export interface MapConfig {
    locale?: 'en' | 'fr'
    parcelPointNetworks: ParcelPointNetwork[]
    options: { autoSelectNearestParcelPoint: boolean; primaryColor: string }
  }

  export interface MapOptions {
    debug?: boolean
    domToLoadMap: string
    baseUrl?: string
    accessToken: string
    config?: MapConfig
    onMapLoaded?: () => void
  }

  export class BoxtalParcelPointMap {
    constructor(opts: MapOptions)
    onSearchParcelPointsResponse(callback: (parcelPoints: ParcelPointAndDistance[]) => void): void
    searchParcelPoints(address: Address, callback: (selectedParcelPoint: ParcelPoint) => void): void
    clearParcelPoints(): void
    chooseParcelPoint(parcelPoint: ParcelPoint): void
    updateConfig(config: MapConfig): void
  }
}
