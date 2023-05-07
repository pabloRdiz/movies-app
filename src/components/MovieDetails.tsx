import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { MovieFull } from '../model/movie';
import { Cast } from '../model/credits';
import { CastItem } from './CastItem';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const MovieDetails = (props: Props) => {
  const { movieFull, cast } = props;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.sectionVotes}>
          <Text>{`Votes: ${movieFull.vote_average}`}</Text>
          <Text>
            - {movieFull.genres.map(current => current.name).join(', ')}
          </Text>
        </View>
        <View style={styles.sectionExtras}>
          <Text style={styles.extrasTitle}>Story</Text>
          <Text style={styles.extrasText}>{movieFull.overview}</Text>
        </View>
        <View style={styles.sectionExtras}>
          <Text style={styles.extrasTitle}>Budget</Text>
          <Text style={styles.extrasText}>
            {formatNumber(movieFull.budget)}
          </Text>
        </View>
        <View style={styles.sectionExtras}>
          <Text style={styles.extrasTitle}>Cast</Text>
        </View>
      </View>
      <View style={styles.cast}>
        <FlatList
          data={cast}
          horizontal={true}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CastItem actor={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  sectionVotes: {
    flexDirection: 'row',
    marginTop: 5,
    opacity: 0.8,
  },
  sectionExtras: {
    marginTop: 20,
  },
  extrasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  extrasText: {
    fontSize: 16,
    marginTop: 10,
  },
  cast: {
    marginBottom: 100,
    marginTop: 20,
    height: 60,
  },
});
