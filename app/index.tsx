import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import StyledText from '@/components/common/StyledText';
import ChanceOfRainCard from '@/components/weather/ChanceOfRainCard';
import DayForecastCard from '@/components/weather/DayForecastCard';
import HeroSection from '@/components/weather/HeroSection';
import HourlyForecast from '@/components/weather/HourlyForecast';
import SegmentedTabs, { TabType } from '@/components/weather/SegmentedTabs';
import StatTiles from '@/components/weather/StatTiles';


import BoxView from '@/components/common/BoxView';
import FlexView from '@/components/common/FlexView';
import LocationSearch from '@/components/weather/LocationSearch';
import TenDayForecast from '@/components/weather/TenDayForecast';
import Colors from '@/constants/Colors';
import { useLocation } from '@/hooks/useLocation';
import { useWeather } from '@/hooks/useWeather';

const WeatherScreen = () => {
  const currentLocation = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('Today');

  // Use selected location if available, otherwise use current location, otherwise fallback
  const lat = selectedLocation?.lat ?? currentLocation.coords?.latitude ?? 49.9935;
  const lon = selectedLocation?.lon ?? currentLocation.coords?.longitude ?? 36.2304;
  const locationName = selectedLocation?.name ?? currentLocation.locationName;

  const { data: weather, isLoading, error } = useWeather(lat, lon);
  const scrollY = useSharedValue(0);
  console.log(weather, "weather");

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    setSelectedLocation({ lat, lon, name });
  };

  if (isLoading || currentLocation.loading) {
    return (
      <FlexView jc="center" ai="center" bg={Colors.background} style={{ flex: 1 }}>
        <StyledText>Loading...</StyledText>
      </FlexView>
    );
  }

  if (error || !weather) {
    return (
      <FlexView jc="center" ai="center" bg={Colors.background} style={{ flex: 1 }}>
        <StyledText>Error loading weather data</StyledText>
        {currentLocation.error && <StyledText>{currentLocation.error}</StyledText>}
      </FlexView>
    );
  }

  // Determine which data to show based on active tab
  const isTomorrow = activeTab === 'Tomorrow';

  // Get the appropriate hourly data slice
  const displayHourly = isTomorrow
    ? weather.hourly.slice(24, 48) // Tomorrow's hours (24-48)
    : weather.hourly.slice(0, 24);  // Today's hours (0-24)

  // Get the appropriate daily data
  const displayDaily = isTomorrow ? weather.daily[1] : weather.daily[0];

  // Construct stats object for StatTiles
  const stats = {
    windSpeed: weather.current.windSpeed,
    precipProb: displayHourly[0]?.precipProb ?? 0,
    humidity: displayHourly[0]?.humidity ?? 0,
    pressure: weather.current.pressure,
  };

  return (
    <FlexView bg={Colors.background}>
      <StatusBar />

      <HeroSection
        scrollY={scrollY}
        weather={weather}
        locationName={locationName}
        onSearchPress={() => setShowSearch(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SegmentedTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Show for Today and Tomorrow tabs */}
        {(activeTab === 'Today' || activeTab === 'Tomorrow') && (
          <>
            <StatTiles stats={stats} />
            <HourlyForecast hourly={displayHourly} />
            <DayForecastCard daily={weather.daily} />
            <ChanceOfRainCard />
          </>
        )}

        {/* Show only for 10 days tab */}
        {activeTab === '10 days' && (
          <TenDayForecast daily={weather.daily} />
        )}
      </Animated.ScrollView>

      {showSearch && (
        <BoxView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
        >
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            onClose={() => setShowSearch(false)}
          />
        </BoxView>
      )}
    </FlexView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 400, // Match HERO_HEIGHT
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
});

export default WeatherScreen;
