import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { formatCurrency, usdToIdr } from '../utilities';

interface Props {
  value: number
}

const styles = StyleSheet.create({
  animatedText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'right',
  },
});

const AnimatedNumber = ({ value }: Props) => {
  const [currentColor] = useState(new Animated.Value(0));
  const prevValue = useRef(value);

  const formattedPrice = formatCurrency(usdToIdr(Number(value)), 0);

  const color = currentColor.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['#dc2626', '#000000', '#16a34a'], // red - black - green
  });

  useEffect(() => {
    if (value < prevValue.current) {
      Animated.sequence([
        Animated.timing(currentColor, {
          toValue: -1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(currentColor, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (value > prevValue.current) {
      Animated.sequence([
        Animated.timing(currentColor, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(currentColor, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start();
    }
    prevValue.current = value;
  }, [value, currentColor]);

  return (
    <View>
      <Animated.Text style={[styles.animatedText, { color }]}>
        {`Rp ${formattedPrice}`}
      </Animated.Text>
    </View>
  );
};

export default AnimatedNumber;
