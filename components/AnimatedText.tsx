import React, { useState, useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { USD_TO_IDR_DEFAULT } from '../constants';

interface Props {
  value: number
}

const AnimatedNumber = ({ value }: Props) => {
  const [currentColor, setCurrentColor] = useState(new Animated.Value(0));
  const prevValue = useRef(value);

  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    maximumFractionDigits: 0,
  });

  const rupiahPrice = (Number(value) * Number(USD_TO_IDR_DEFAULT));
  const formattedPrice = currencyFormatter.format(rupiahPrice);

  const color = currentColor.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['#FF0000', '#000000', '#00FF00'],
  });

  useEffect(() => {
    if (value < prevValue.current) {
      Animated.sequence([
        Animated.timing(currentColor, {
          toValue: -1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(currentColor, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (value > prevValue.current) {
      Animated.sequence([
        Animated.timing(currentColor, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(currentColor, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    }
    prevValue.current = value;
  }, [value, currentColor]);

  return (
    <View>
      <Animated.Text style={{ fontWeight: "bold", fontSize: 15, textAlign: "right", color }}>Rp {formattedPrice}</Animated.Text>
    </View>
  );
};

export default AnimatedNumber;
