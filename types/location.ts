export interface LocationCoords {
    latitude: number;
    longitude: number;
}

export interface LocationData {
    coords: LocationCoords | null;
    locationName: string | null;
    error: string | null;
    loading: boolean;
}