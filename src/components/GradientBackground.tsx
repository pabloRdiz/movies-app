import React, { useContext, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useFade } from '../hooks/UseFade';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const GradientBackground = (props: Props) => {
  const { children } = props;
  const { colors, prevColors, setPrevColors } = useContext(GradientContext);
  const { fadeIn, fadeOut, opacity } = useFade();

  useEffect(() => {
    fadeIn(() => {
      setPrevColors(colors);
      fadeOut();
    });
  }, [colors, fadeIn, fadeOut, setPrevColors]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, 'white']}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.5, y: 0.7 }}
      />
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, opacity: opacity }}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, 'white']}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.5, y: 0.7 }}
        />
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
