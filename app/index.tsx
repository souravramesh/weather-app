import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import StyledText from '@/components/common/StyledText';
import ChanceOfRainCard from '@/components/weather/ChanceOfRainCard';
import DayForecastCard from '@/components/weather/DayForecastCard';
import HeroSection from '@/components/weather/HeroSection';
import HourlyForecast from '@/components/weather/HourlyForecast';
import SegmentedTabs from '@/components/weather/SegmentedTabs';
import StatTiles from '@/components/weather/StatTiles';


import FlexView from '@/components/common/FlexView';
import TenDayForecast from '@/components/weather/TenDayForecast';
import Colors from '@/constants/Colors';
import { useWeather } from '@/hooks/useWeather';

const WeatherScreen = () => {
  const { data: weather, isLoading } = useWeather();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  if (isLoading || !weather) {
    return (
      <FlexView jc="center" ai="center" bg={Colors.background}>
        <StyledText>Loading...</StyledText>
      </FlexView>
    );
  }

  return (
    <FlexView bg={Colors.background}>
      <StatusBar />

      <HeroSection scrollY={scrollY} weather={weather} />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SegmentedTabs />
        <StatTiles stats={weather.stats} />
        <HourlyForecast hourly={weather.hourly} />
        <DayForecastCard data={weather.chartData} />
        <ChanceOfRainCard />
        <TenDayForecast daily={weather.daily} />
      </Animated.ScrollView>
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
