import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useMovies } from '../hooks/useMovies';
import { Poster } from '../components/Poster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HorizontalSlider } from '../components/HorizontalSlider';

const { width: windowWidth } = Dimensions.get('window');

const getStyles = (top: number) =>
  StyleSheet.create({
    container: { marginTop: top },
    carouselContainer: { height: 430 },
    loadingContianer: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
  });

export const HomeScreen = () => {
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const styles = getStyles(top);

  if (isLoading) {
    return (
      <View style={styles.loadingContianer}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={nowPlaying}
            renderItem={({ item }) => <Poster movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
          />
        </View>
        <HorizontalSlider movies={popular} title="Populars" />
        <HorizontalSlider movies={topRated} title="Top Rated" />
        <HorizontalSlider movies={upcoming} title="Upcoming" />
      </View>
    </ScrollView>
  );
};
