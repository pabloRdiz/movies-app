import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Props } from './DetailScreen.types';
import { ScrollView } from 'react-native-gesture-handler';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

const screenHeight = Dimensions.get('screen').height;

export const DetailScreen = (props: Props) => {
  const { route, navigation } = props;
  const { movie } = route.params;
  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            style={styles.image}
            source={{
              uri: uri,
            }}
          />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={30} color="tomato" />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast} />
      )}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.iconBack}>{'←'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#000',
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    borderRadius: 16,
    elevation: 5,
    height: screenHeight * 0.6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    width: '100%',
  },
  imageBorder: {
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    flex: 1,
    overflow: 'hidden',
  },
  image: { flex: 1 },
  sectionContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  subTitle: {
    fontSize: 18,
    opacity: 0.6,
  },
  iconContainer: {
    justifyContent: 'center',
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    // backgroundColor: 'gray',
    // opacity: 0.5,
  },
  iconBack: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
  },
});
