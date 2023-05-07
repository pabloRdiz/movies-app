import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Poster } from './Poster';
import { Movie } from '../model/movie';

interface Props {
  movies: Movie[];
  title?: string;
}

export const HorizontalSlider = (props: Props) => {
  const { movies, title } = props;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <Poster movie={item} width={120} height={180} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 260,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginLeft: 12,
    marginBottom: 8,
  },
});
