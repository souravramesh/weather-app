import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

interface LocationResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
}

interface LocationSearchProps {
    onLocationSelect: (lat: number, lon: number, name: string) => void;
    onClose: () => void;
}

const LocationSearch = ({ onLocationSelect, onClose }: LocationSearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<LocationResult[]>([]);
    const [loading, setLoading] = useState(false);

    const searchLocation = async (query: string) => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
            );
            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error('Failed to search location:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        searchLocation(text);
    };

    const handleSelect = (item: LocationResult) => {
        const locationName = item.admin1 ? `${item.name}, ${item.admin1}` : `${item.name}, ${item.country}`;
        onLocationSelect(item.latitude, item.longitude, locationName);
        onClose();
    };

    return (
        <BoxView bg={Colors.surface} r={20} p={16} style={{ width: '100%', maxHeight: '80%' }}>
            <BoxView fd="row" jc="space-between" ai="center" mb={16}>
                <StyledText size={18} weight="600">Search Location</StyledText>
                <TouchableOpacity onPress={onClose}>
                    <StyledText size={16} color={Colors.textSecondary}>Close</StyledText>
                </TouchableOpacity>
            </BoxView>

            <TextInput
                style={{
                    backgroundColor: Colors.background,
                    borderRadius: 12,
                    padding: 12,
                    color: Colors.text,
                    marginBottom: 16,
                }}
                placeholder="Enter city name..."
                placeholderTextColor={Colors.textSecondary}
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus
            />

            {loading && (
                <BoxView ai="center" p={20}>
                    <ActivityIndicator color={Colors.text} />
                </BoxView>
            )}

            {!loading && results.length > 0 && (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelect(item)}>
                            <BoxView p={12} mb={8} bg={Colors.background} r={12}>
                                <StyledText size={16}>{item.name}</StyledText>
                                <StyledText size={14} color={Colors.textSecondary}>
                                    {item.admin1 ? `${item.admin1}, ` : ''}{item.country}
                                </StyledText>
                            </BoxView>
                        </TouchableOpacity>
                    )}
                />
            )}

            {!loading && searchQuery.length >= 2 && results.length === 0 && (
                <BoxView ai="center" p={20}>
                    <StyledText color={Colors.textSecondary}>No locations found</StyledText>
                </BoxView>
            )}
        </BoxView>
    );
};

export default LocationSearch;
