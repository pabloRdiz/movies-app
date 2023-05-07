import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Movie } from '../model/movie';
import {
  NavigationScreens,
  RouteStackParams,
} from '../navigation/Navigation.types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

type navigationProps = NativeStackNavigationProp<
  RouteStackParams,
  NavigationScreens
>;

export const Poster = (props: Props) => {
  const { movie, height = 420, width = 300 } = props;
  const navigation = useNavigation<navigationProps>();

  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(NavigationScreens.DETAIL_SCREEN, { movie: movie })
      }
      style={[styles.container, { height, width }]}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 16,
    elevation: 5,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  image: {
    flex: 1,
    borderRadius: 16,
  },
});
