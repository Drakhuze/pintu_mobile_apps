import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { IToken } from '../interfaces';
import Token from './Token';

const styles = StyleSheet.create({
  tokenListContainer: {
    flexDirection: 'column',
  },
});
interface Props {
  tokens: IToken[]
}

const TokenList = ({ tokens }: Props) => (
  <View style={styles.tokenListContainer}>
    {tokens.map((item: IToken) => (
      <Token key={item.name} data={item} />
    ))}
  </View>
);

export default TokenList;
