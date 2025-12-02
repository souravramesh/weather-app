import { LocationData } from '@/types/location';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useLocation = () => {
    const [location, setLocation] = useState<LocationData>({
        coords: null,
        locationName: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        (async () => {
            try {
                // Request permission
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setLocation({
                        coords: null,
                        locationName: null,
                        error: 'Location permission denied',
                        loading: false,
                    });
                    return;
                }

                // Get current location
                const currentLocation = await Location.getCurrentPositionAsync({});

                // Reverse geocode to get location name
                const [address] = await Location.reverseGeocodeAsync({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });

                const locationName = address.city || address.region || address.country || 'Unknown Location';

                setLocation({
                    coords: {
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                    },
                    locationName,
                    error: null,
                    loading: false,
                });
            } catch (err) {
                setLocation({
                    coords: null,
                    locationName: null,
                    error: err instanceof Error ? err.message : 'Failed to get location',
                    loading: false,
                });
            }
        })();
    }, []);

    return location;
};
