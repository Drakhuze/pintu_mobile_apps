import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Image, Text, Easing } from "react-native";
import { USD_TO_IDR_DEFAULT } from "../constants";
import { IFinalData } from "../interfaces";
import AnimatedText from "./AnimatedText";

interface Props {
  data: IFinalData
}

const Token = ({ data }: Props) => {

  const percentColor = Number(data.priceChangePercent) === 0 ? 'white' : Number(data.priceChangePercent) > 0 ? 'green' : 'red';
  return (
    <View key={data.name} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, padding: 10, borderBottomWidth: 1, borderBottomColor: "#e5e5e5" }}>
      <View style={{ width: "15%" }}>
        <Image source={{ uri: data.logo }}
          style={{ width: 30, height: 30, borderRadius: 9999 }} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{data.fullName}</Text>
        <Text style={{ color: "#a3a3a3", fontSize: 15 }}>{data.name}</Text>
      </View>
      <View style={{ flexDirection: "column", marginLeft: "auto" }}>
        <AnimatedText value={data.price}></AnimatedText>
        <Text style={{ fontWeight: "bold", fontSize: 15, textAlign: "right", color: percentColor }}>
          {Number(data.priceChangePercent).toFixed(2)}%</Text>
      </View>
    </View>
  );
}

export default Token;

const styles = StyleSheet.create({
  tokenPrice: {
    color: "white",
  },
})
