import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import StyledText from '@/components/common/StyledText';
import ChanceOfRainCard from '@/components/weather/ChanceOfRainCard';
import DayForecastCard from '@/components/weather/DayForecastCard';
import HeroSection from '@/components/weather/HeroSection';
import HourlyForecast from '@/components/weather/HourlyForecast';
import SegmentedTabs from '@/components/weather/SegmentedTabs';
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

  // Use selected location if available, otherwise use current location, otherwise fallback
  const lat = selectedLocation?.lat ?? currentLocation.coords?.latitude ?? 49.9935;
  const lon = selectedLocation?.lon ?? currentLocation.coords?.longitude ?? 36.2304;
  const locationName = selectedLocation?.name ?? currentLocation.locationName;

  const { data: weather, isLoading, error } = useWeather(lat, lon);
  const scrollY = useSharedValue(0);

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

  // Construct stats object for StatTiles
  const stats = {
    windSpeed: weather.current.windSpeed,
    precipProb: weather.hourly[0]?.precipProb ?? 0,
    humidity: weather.hourly[0]?.humidity ?? 0,
    pressure: weather.current.pressure,
  };

  // Map hourly data to chart data (x: index, y: temp)
  const chartData = weather.hourly.map((item, index) => ({ x: index, y: item.temp }));

  return (
    <FlexView bg={Colors.background}>
      <StatusBar />

      <HeroSection
        scrollY={scrollY}
        weather={weather}
        locationName={locationName}
        onSearchPress={() => setShowSearch(true)}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SegmentedTabs />
        <StatTiles stats={stats} />
        <HourlyForecast hourly={weather.hourly} />
        <DayForecastCard data={chartData} />
        <ChanceOfRainCard />
        <TenDayForecast daily={weather.daily} />
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
