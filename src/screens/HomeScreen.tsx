import React, { useCallback, useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { useMovies } from '../hooks/useMovies';
import { Poster } from '../components/Poster';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getImageColors';
import { GradientContext } from '../context/GradientContext';

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
  const { setColors } = useContext(GradientContext);
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const styles = getStyles(top);

  const getPosterColors = useCallback(
    async (index: number) => {
      const movie = nowPlaying[index];
      const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      const [primary = 'blue', secondary = 'oragne'] = await getImageColors(
        uri,
      );

      setColors({ primary: primary, secondary: secondary });
    },
    [nowPlaying, setColors],
  );

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [getPosterColors, nowPlaying]);

  if (isLoading) {
    return (
      <View style={styles.loadingContianer}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.carouselContainer}>
            <Carousel
              data={nowPlaying}
              renderItem={({ item }) => <Poster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          <HorizontalSlider movies={popular} title="Populars" />
          <HorizontalSlider movies={topRated} title="Top Rated" />
          <HorizontalSlider movies={upcoming} title="Upcoming" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
