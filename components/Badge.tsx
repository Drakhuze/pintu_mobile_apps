import React from 'react';
import {
  Text, StyleSheet, Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  text: string;
  tag: string;
  icon: 'star' | 'bank' | 'deviantart' | 'gamepad' | 'lightbulb-o' | 'users' | 'inbox' | 'globe' | 'certificate';
  setSelectedBadge: any;
  color: string;
}

const styles = StyleSheet.create({
  pillPressable: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 20,
    justifyContent: 'center',
  },
});

const Badge = ({
  text, tag, icon, setSelectedBadge, color,
}: Props) => (
  <Pressable
    style={[styles.pillPressable, { backgroundColor: color }]}
    onPress={() => setSelectedBadge(tag)}
  >
    <FontAwesome name={icon} size={15} style={{ marginRight: 5 }} color="black" />
    <Text>{text}</Text>
  </Pressable>
);

export default Badge;
