import React from 'react';
import {
  StyleSheet, View, Image, Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IToken } from '../interfaces';
import AnimatedNumber from './AnimatedNumber';
import { globalStyles } from '../styles';
import { formatPercentage } from '../utilities';

interface Props {
  data: IToken
}

const styles = StyleSheet.create({
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  tokenPrice: {
    color: 'white',
  },
  roundPicture: {
    width: 30,
    height: 30,
    borderRadius: 9999,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
  },
  priceSkeleton: {
    backgroundColor: 'lightgray',
    width: 100,
    height: 18,
    marginBottom: 3,
  },
  percentSkeleton: {
    backgroundColor: 'lightgray',
    width: 70,
    height: 18,
  },
});

const Token = ({ data }: Props) => {
  const priceChangeStatus = Number(data.priceChangePercent) === 0 ? 'zero' : Number(data.priceChangePercent) > 0 ? 'up' : 'down';
  const percentColor = Number(data.priceChangePercent) === 0 ? 'black' : Number(data.priceChangePercent) > 0 ? '#16a34a' : '#dc2626';
  const formattedPercent = formatPercentage(Number(data.priceChangePercent), 2);

  return (
    <View key={data.name} style={styles.tokenContainer}>
      <View style={{ paddingRight: 15 }}>
        <Image
          source={{ uri: data.logo }}
          style={styles.roundPicture}
        />
      </View>
      <View style={globalStyles.flexDirectionColumn}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{data.fullName}</Text>
        <Text style={{ color: '#a3a3a3', fontSize: 16 }}>{data.name}</Text>
      </View>
      <View style={[globalStyles.marginLeftAuto, globalStyles.flexDirectionColumn]}>
        {data.price !== undefined
          ? <AnimatedNumber value={data.price} />
          : <View style={styles.priceSkeleton} />}

        <View style={[globalStyles.marginLeftAuto, globalStyles.flexDirectionRow]}>
          {data.priceChangePercent !== undefined
            ? (
              <>
                {priceChangeStatus === 'up'
                  ? <Ionicons name="caret-up" size={20} color={percentColor} />
                  : priceChangeStatus === 'down'
                  && <Ionicons name="caret-down" size={20} color={percentColor} />}

                <Text style={[styles.priceText, { color: percentColor }]}>
                  {`${formattedPercent} %`}
                </Text>
              </>
            )
            : <View style={styles.percentSkeleton} />}
        </View>
      </View>
    </View>
  );
};

export default Token;
