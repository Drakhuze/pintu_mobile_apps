import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface Props {
  text: string;
  tag: string;
  setSelectedPill: any;
}

const PillText = ({text, tag, setSelectedPill}: Props) => {
  return (
    <Pressable style={styles.pillPressable} onPress={() => setSelectedPill(tag)}>
      <Text>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({    
  pillPressable: {
    width: "auto",
    height: "auto",
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 20,
    justifyContent:"center"
  },
})

export default PillText;