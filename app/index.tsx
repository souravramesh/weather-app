import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, RefreshControl, StatusBar, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import StyledText from '@/components/common/StyledText';
import ChanceOfRainCard from '@/components/home/ChanceOfRainCard';
import DayForecastCard from '@/components/home/DayForecastCard';
import HeroSection from '@/components/home/HeroSection';
import HourlyForecast from '@/components/home/HourlyForecast';
import SegmentedTabs, { TabType } from '@/components/home/SegmentedTabs';
import StatTiles from '@/components/home/StatTiles';
import SunTimes from '@/components/home/SunTimes';


import BoxView from '@/components/common/BoxView';
import FlexView from '@/components/common/FlexView';
import LocationSearch from '@/components/home/LocationSearch';
import TenDayForecast from '@/components/home/TenDayForecast';
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
  const [refreshing, setRefreshing] = useState(false);

  // Use selected location if available, otherwise use current location, otherwise fallback
  const lat = selectedLocation?.lat ?? currentLocation.coords?.latitude ?? 49.9935;
  const lon = selectedLocation?.lon ?? currentLocation.coords?.longitude ?? 36.2304;
  const locationName = selectedLocation?.name ?? currentLocation.locationName;

  const { data: weather, isLoading, error, isFromCache, cacheTimestamp, refetch } = useWeather(lat, lon);
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
      <FlexView jc="center" ai="center" bg={Colors.background}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </FlexView>
    );
  }

  if (error || !weather) {
    // Show error only if we don't have cached data
    if (!weather) {
      return (
        <FlexView jc="center" ai="center" bg={Colors.background} g={10}>
          <StyledText>Unable to load weather data</StyledText>
          <StyledText style={{ opacity: 0.6, fontSize: 14 }}>
            {currentLocation.error || 'Please check your internet connection'}
          </StyledText>
        </FlexView>
      );
    }
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    refetch();
    setRefreshing(false);
  };

  const getCacheAgeText = () => {
    if (!cacheTimestamp) return '';
    const ageMinutes = Math.floor((Date.now() - cacheTimestamp) / (60 * 1000));
    if (ageMinutes < 1) return 'Updated just now';
    if (ageMinutes === 1) return 'Updated 1 minute ago';
    if (ageMinutes < 60) return `Updated ${ageMinutes} minutes ago`;
    const ageHours = Math.floor(ageMinutes / 60);
    if (ageHours === 1) return 'Updated 1 hour ago';
    return `Updated ${ageHours} hours ago`;
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            progressViewOffset={400}
          />
        }
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
        {isFromCache && (
          <BoxView
            fd="row"
            ai="center"
            jc="space-between"
            mx={10}
          >
            <StyledText opacity={0.8}>
              Offline Mode
            </StyledText>
            <StyledText size={12} opacity={0.6}>
              {getCacheAgeText()}
            </StyledText>
          </BoxView>
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
