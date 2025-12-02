import React, { useState } from 'react';
import { ActivityIndicator, Modal, StatusBar, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import StyledText from '@/components/common/StyledText';
import ChanceOfRainCard from '@/components/weather/ChanceOfRainCard';
import DayForecastCard from '@/components/weather/DayForecastCard';
import HeroSection from '@/components/weather/HeroSection';
import HourlyForecast from '@/components/weather/HourlyForecast';
import SegmentedTabs, { TabType } from '@/components/weather/SegmentedTabs';
import StatTiles from '@/components/weather/StatTiles';
import SunTimes from '@/components/weather/SunTimes';


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
  console.log(weather);

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
      <FlexView jc="center" ai="center" bg={Colors.background} g={10}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <StyledText>Loading...</StyledText>
      </FlexView>
    );
  }

  if (error || !weather) {
    return (
      <FlexView jc="center" ai="center" bg={Colors.background} g={10}>
        <StyledText>Error loading weather data</StyledText>
        {currentLocation.error && <StyledText>{currentLocation.error}</StyledText>}
      </FlexView>
    );
  }

  const isTomorrow = activeTab === 'Tomorrow';

  const displayHourly = isTomorrow
    ? weather.hourly.slice(24, 48)
    : weather.hourly.slice(0, 24);

  const displayDaily = isTomorrow ? weather.daily[1] : weather.daily[0];

  const stats = {
    windSpeed: weather.current.windSpeed,
    precipProb: displayHourly[0]?.precipProb ?? 0,
    humidity: displayHourly[0]?.humidity ?? 0,
    pressure: weather.current.pressure,
  };

  return (
    <FlexView bg={Colors.background}>
      <StatusBar backgroundColor={"#704ad2"} />

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

        {(activeTab === 'Today' || activeTab === 'Tomorrow') && (
          <>
            <StatTiles stats={stats} />
            <HourlyForecast hourly={displayHourly} />
            <DayForecastCard daily={weather.daily} />
            <ChanceOfRainCard hourly={displayHourly} />
            <SunTimes today={displayDaily} />
          </>
        )}

        {activeTab === '10 days' && (
          <TenDayForecast daily={weather.daily} />
        )}
      </Animated.ScrollView>

      <Modal
        visible={showSearch}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSearch(false)}
      >
        <LocationSearch
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowSearch(false)}
        />
      </Modal>

    </FlexView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 400,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
});

export default WeatherScreen;
