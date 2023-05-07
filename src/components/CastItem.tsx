import React from 'react';
import { Cast } from '../model/credits';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  actor: Cast;
}

export const CastItem = (props: Props) => {
  const { actor } = props;

  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

  return (
    <View style={styles.container}>
      {actor.profile_path && (
        <Image
          style={styles.image}
          source={{
            uri: uri,
          }}
        />
      )}
      <View style={styles.actorInfo}>
        <View>
          <Text style={styles.actor}>{actor.name}</Text>
        </View>
        <View>
          <Text style={styles.character}>{actor.character}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  actorInfo: {
    marginHorizontal: 10,
    marginTop: 4,
  },
  actor: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  character: {
    fontSize: 16,
    opacity: 0.7,
  },
});
