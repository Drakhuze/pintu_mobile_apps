import { JSXElementConstructor } from "react";
import { View, Image, Text } from "react-native";
import { IFinalData } from "../interfaces";
import Token from "./Token";

interface Props {
  tokens: IFinalData[]
}

const TokenList = ({ tokens }: Props) => {
  return (
    <View style={{ flexDirection: "column" }}>
      {tokens.map((item: IFinalData) => {
        return (
          <Token key={item.name} data={item} />
        )
      })}
    </View>
  );
}

export default TokenList;